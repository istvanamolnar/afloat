import { execFileSync } from "node:child_process";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "dist", "extension");
const require = createRequire(import.meta.url);
const compiler = path.join(path.dirname(require.resolve("typescript/package.json")), "bin", "tsc");
execFileSync(process.execPath, [compiler, "-p", "tsconfig.extension.json"], {
  cwd: root,
  stdio: "inherit",
  windowsHide: true,
});
await mkdir(output, { recursive: true });
await copyFile(path.join(root, "extension", "icon.png"), path.join(output, "icon.png"));
const manifest = await readFile(path.join(root, "extension", "manifest.json"), "utf8");
await writeFile(path.join(output, "manifest.json"), manifest.replaceAll("\r\n", "\n"));
console.log("Compiled extension to dist/extension.");
