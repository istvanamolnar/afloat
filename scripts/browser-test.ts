// Uses a separate browser profile. Pass "edge" to test Microsoft Edge.
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import type * as Playwright from "playwright";

// These globals belong to the test page, not the Node.js process.
declare global {
  var video: HTMLVideoElement;
  var originalVideo: HTMLVideoElement;
  var attackerCalls: number;
}

const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE_PATH || "playwright") as typeof Playwright;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const browserName = process.argv[2] || "chrome";
assert(["chrome", "edge"].includes(browserName), "Use chrome or edge");
const output = path.join(root, "test-results");
await mkdir(output, { recursive: true });
const context = await chromium.launchPersistentContext(path.join(output, `${browserName}-profile`), {
  executablePath: process.env.BROWSER_EXECUTABLE || process.env.CHROME_EXECUTABLE || (browserName === "edge"
    ? "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
    : "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"),
  headless: false,
  ignoreDefaultArgs: ["--disable-extensions"],
  args: ["--enable-unsafe-extension-debugging", "--no-first-run", "--no-default-browser-check"],
});
try {
  await context.route("https://afloat.test/**", (route) => route.fulfill({ contentType: "text/html", body: route.request().url().endsWith("/empty")
    ? '<!doctype html><title>Another task</title><button onclick="document.documentElement.requestFullscreen()">Fullscreen</button>'
    : `<!doctype html><title>Playing video</title><video id="video" autoplay muted playsinline controls></video><script>
      const canvas = document.createElement('canvas'); canvas.width = 640; canvas.height = 360;
      const ctx = canvas.getContext('2d');
      function draw() { ctx.fillStyle = '#244b3e'; ctx.fillRect(0, 0, 640, 360); ctx.fillStyle = '#d9f7ce'; ctx.font = '28px sans-serif'; ctx.fillText('Afloat playback test ' + Math.round(performance.now()), 30, 180); requestAnimationFrame(draw); }
      draw(); video.srcObject = canvas.captureStream(30); window.originalVideo = video;
    </script>` }));
  const browser = context.browser();
  assert(browser);
  const cdp = await browser.newBrowserCDPSession();
  const { id } = await cdp.send("Extensions.loadUnpacked", { path: path.join(root, "dist", "extension") });
  const worker = context.serviceWorkers().find((item) => item.url().includes(id)) || await context.waitForEvent("serviceworker");
  await worker.evaluate(async () => {
    for (let attempt = 0; attempt < 50; attempt++) {
      if (chrome.action.onClicked.hasListeners()) return;
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    throw new Error("Extension did not initialize");
  });
  const page = context.pages()[0] ?? await context.newPage();
  await page.goto("https://afloat.test/");
  await page.waitForFunction(() => video.readyState >= 2 && !video.paused);
  async function clickAction() {
    await page.bringToFront();
    const { targetInfos } = await cdp.send("Target.getTargets", { filter: [{ type: "tab" }] });
    const target = targetInfos.find((item) => item.url === page.url());
    assert(target);
    await cdp.send("Extensions.triggerAction", { id, targetId: target.targetId });
  }
  const tabId = await worker.evaluate(async () => (await chrome.tabs.query({ active: true, currentWindow: true }))[0]?.id);
  assert(typeof tabId === "number");
  async function waitBadge(expected: string) {
    await worker.evaluate(async ({ tabId, expected }) => {
      for (let attempt = 0; attempt < 50; attempt++) {
        if (await chrome.action.getBadgeText({ tabId }) === expected) return;
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      throw new Error(`Expected toolbar badge: ${expected}`);
    }, { tabId, expected });
  }
  await clickAction();
  try {
    await page.waitForFunction(() => document.pictureInPictureElement === originalVideo, null, { timeout: 5000 });
  } catch (error) {
    console.log("Toolbar:", await worker.evaluate(async (tabId) => ({ badge: await chrome.action.getBadgeText({ tabId }), title: await chrome.action.getTitle({ tabId }) }), tabId));
    console.log("Direct API:", await page.evaluate(async () => { try { await video.requestPictureInPicture(); return "ok"; } catch (error) { return String(error); } }));
    throw error;
  }
  await waitBadge("ON");
  await page.evaluate(() => {
    originalVideo.dispatchEvent(new Event("leavepictureinpicture"));
    originalVideo.dispatchEvent(new Event("leavepictureinpicture"));
  });
  // A round-trip from the same isolated frame drains earlier extension messages.
  await worker.evaluate(async (tabId) => {
    await chrome.scripting.executeScript({ target: { tabId }, func: () => chrome.runtime.sendMessage({ type: "AFLOAT_TEST_BARRIER" }).catch(() => {}) });
  }, tabId);
  assert.equal(await worker.evaluate((tabId) => chrome.action.getBadgeText({ tabId }), tabId), "ON");
  assert.equal(await page.evaluate(() => document.pictureInPictureElement === originalVideo), true);
  console.log("PASS: synthetic close events cannot clear the badge or consume the genuine close listener.");
  await page.evaluate(() => document.exitPictureInPicture());
  await waitBadge("");
  console.log("PASS: genuine close still clears the badge after spoofed events.");
  await page.evaluate(() => {
    window.attackerCalls = 0;
    document.querySelectorAll = () => { window.attackerCalls++; throw new Error("Page override invoked"); };
    HTMLVideoElement.prototype.requestPictureInPicture = () => { window.attackerCalls++; throw new Error("Page override invoked"); };
  });
  await clickAction();
  await page.waitForFunction(() => document.pictureInPictureElement === originalVideo);
  assert.equal(await page.evaluate(() => window.attackerCalls), 0);
  assert.equal(await page.evaluate(() => typeof globalThis.chrome?.runtime?.sendMessage), "undefined");
  console.log("PASS: page JavaScript cannot hijack isolated video APIs or access extension messaging.");
  const before = await page.evaluate(() => video.currentTime);
  const other = await context.newPage();
  await other.goto("https://afloat.test/empty");
  await other.locator("button").click();
  assert.equal(await other.evaluate(() => Boolean(document.fullscreenElement)), true);
  await page.waitForFunction((time) => video.currentTime > time + .2, before);
  assert.equal(await page.evaluate(() => document.pictureInPictureElement === originalVideo && !video.paused), true);
  console.log("PASS: toolbar opens the existing video; playback continues while another tab is fullscreen.");
  await other.evaluate(() => document.exitFullscreen());
  await other.close();
  await clickAction();
  await page.waitForFunction(() => !document.pictureInPictureElement);
  assert.equal(await page.evaluate(() => video === originalVideo && !video.paused), true);
  console.log("PASS: second click returns the video without stopping playback.");
  await clickAction();
  await page.waitForFunction(() => Boolean(document.pictureInPictureElement));
  await page.evaluate(() => document.exitPictureInPicture());
  await page.waitForFunction(() => !document.pictureInPictureElement);
  await waitBadge("");
  console.log("PASS: closing the native PiP window clears the toolbar state.");
  await page.goto("https://afloat.test/empty");
  await clickAction();
  await waitBadge("!");
  assert.match(await worker.evaluate((tabId) => chrome.action.getTitle({ tabId }), tabId), /Start a YouTube video/);
  console.log(`PASS: pages without a video get useful feedback. All ${browserName} browser checks passed.`);
} finally {
  await context.close();
}
