import { readFile, access, readdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const extension = path.join(root, "dist", "extension");
const manifest: chrome.runtime.ManifestV3 = JSON.parse(await readFile(path.join(extension, "manifest.json"), "utf8"));
const project = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
assert.equal(manifest.manifest_version, 3);
assert.equal(manifest.version, project.version);
assert(typeof manifest.description === "string");
assert(manifest.name.length <= 75 && manifest.description.length <= 132);
assert.deepEqual(manifest.permissions?.toSorted(), ["activeTab", "scripting"]);
for (const field of ["host_permissions", "externally_connectable", "web_accessible_resources", "content_scripts", "update_url"]) {
  assert.equal(Reflect.get(manifest, field), undefined, `${field} is not needed by Afloat`);
}
assert.equal(manifest.content_security_policy?.extension_pages, "script-src 'self'; object-src 'none'; base-uri 'none'");
assert.equal(manifest.action?.default_icon, "icon.png");
assert.deepEqual(manifest.icons, { "128": "icon.png" });
assert.deepEqual((await readdir(extension)).toSorted(), ["background.js", "icon.png", "manifest.json", "video.js"]);
assert(manifest.background && "service_worker" in manifest.background);
assert(manifest.icons);
for (const file of new Set([manifest.background.service_worker, "video.js", ...Object.values(manifest.icons), "icon.png"])) {
  await access(path.join(extension, file));
}
for (const file of await readdir(extension)) {
  if (file.endsWith(".js")) execFileSync(process.execPath, ["--check", path.join(extension, file)], { stdio: "inherit" });
}
console.log("Manifest, referenced assets, and JavaScript syntax passed.");

async function checkPng(file: string, width: number, height: number) {
  const png = await readFile(path.join(root, file));
  assert.equal(png.subarray(0, 8).toString("hex"), "89504e470d0a1a0a", `${file}: expected PNG`);
  assert.equal(png.readUInt32BE(16), width, `${file}: wrong width`);
  assert.equal(png.readUInt32BE(20), height, `${file}: wrong height`);
}
await checkPng("extension/icon.png", 128, 128);
await checkPng("store/assets/promo-440x280.png", 440, 280);
console.log("Single extension icon and store promotional image dimensions passed.");
