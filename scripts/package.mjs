import { readFile, readdir, mkdir, rm, writeFile } from "node:fs/promises";
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
const temporary = `${archive}.tmp`;
const entries = [
  ...((await readdir(source)).map((name) => [path.join(source, name), name])),
  [license, "LICENSE"],
].sort((a, b) => a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0);
const quote = (value) => `'${value.replaceAll("'", "''")}'`;
await rm(temporary, { force: true });
try {
  execFileSync("powershell.exe", ["-NoProfile", "-Command",
    `$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$afloatArchive = [System.IO.Compression.ZipFile]::Open(${quote(temporary)}, 'Create')
try {
${entries.map(([file, name]) => `  $afloatBytes = [System.IO.File]::ReadAllBytes(${quote(file)})
  $afloatEntry = $afloatArchive.CreateEntry(${quote(name)})
  $afloatEntry.LastWriteTime = [DateTimeOffset]::new(2000, 1, 1, 0, 0, 0, [TimeSpan]::Zero)
  $afloatStream = $afloatEntry.Open()
  try { $afloatStream.Write($afloatBytes, 0, $afloatBytes.Length) } finally { $afloatStream.Dispose() }`).join("\n")}
} finally { $afloatArchive.Dispose() }`,
  ], { stdio: "inherit", windowsHide: true });
  let previous;
  try { previous = await readFile(archive); } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  if (!previous?.equals(await readFile(temporary))) {
    execFileSync("powershell.exe", ["-NoProfile", "-Command",
      `$ErrorActionPreference = 'Stop'; if ([System.IO.File]::Exists(${quote(archive)})) { [System.IO.File]::Replace(${quote(temporary)}, ${quote(archive)}, [NullString]::Value) } else { [System.IO.File]::Move(${quote(temporary)}, ${quote(archive)}) }`,
    ], { stdio: "inherit", windowsHide: true });
  }
} finally {
  await rm(temporary, { force: true });
}
console.log(`Created ${archive}`);
const sha256 = createHash("sha256").update(await readFile(archive)).digest("hex");
await writeFile(`${archive}.sha256`, `${sha256}  ${path.basename(archive)}\n`);
console.log(`SHA-256: ${sha256}`);
