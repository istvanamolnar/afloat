import { toggleVideo } from "./video.js";

async function showState(tabId: number, active: boolean, error?: string) {
  await Promise.allSettled([
    chrome.action.setBadgeText({ tabId, text: error ? "!" : active ? "ON" : "" }),
    chrome.action.setBadgeBackgroundColor({ tabId, color: error ? "#a64b2a" : "#244b3e" }),
    chrome.action.setTitle({ tabId, title: error || (active ? "Afloat — Return video to tab" : "Afloat — Float this video") }),
  ]);
}

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;
  try {
    const [injection] = await chrome.scripting.executeScript({ target: { tabId: tab.id }, func: toggleVideo });
    const result = injection?.result || { active: false, error: "Afloat — Reload the video page, then try again." };
    await showState(tab.id, result.active, result.error);
  } catch {
    await showState(tab.id, false, "Afloat — Open a YouTube video, start playback, then click again.");
  }
});

chrome.runtime.onMessage.addListener((message: unknown, sender) => {
  if (sender.id === chrome.runtime.id && sender.tab?.id && sender.frameId === 0 &&
      typeof message === "object" && message !== null && "type" in message && message.type === "AFLOAT_CLOSED") {
    void showState(sender.tab.id, false);
  }
});

chrome.tabs.onUpdated.addListener((tabId, change) => {
  if (change.status === "loading") void showState(tabId, false);
});
