import { readFile, mkdir, rm, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";
import "./check.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "extension");
const license = path.join(root, "LICENSE");
const manifest = JSON.parse(await readFile(path.join(source, "manifest.json"), "utf8"));
const dist = path.join(root, "dist");
await mkdir(dist, { recursive: true });
const archive = path.join(dist, `afloat-${manifest.version}.zip`);
if (!/^\d+\.\d+\.\d+$/.test(manifest.version)) throw new Error("Invalid extension version");
await rm(archive, { force: true });
const quote = (value) => `'${value.replaceAll("'", "''")}'`;
execFileSync("powershell.exe", ["-NoProfile", "-Command",
  `$ErrorActionPreference = 'Stop'; Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::CreateFromDirectory(${quote(source)}, ${quote(archive)}); $afloatArchive = [System.IO.Compression.ZipFile]::Open(${quote(archive)}, 'Update'); try { [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($afloatArchive, ${quote(license)}, 'LICENSE') | Out-Null } finally { $afloatArchive.Dispose() }`,
], { stdio: "inherit", windowsHide: true });
console.log(`Created ${archive}`);
const sha256 = createHash("sha256").update(await readFile(archive)).digest("hex");
await writeFile(`${archive}.sha256`, `${sha256}  ${path.basename(archive)}\n`);
console.log(`SHA-256: ${sha256}`);
