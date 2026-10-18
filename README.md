# Afloat

Lightweight Chromium extension that keeps your current video in an always-on-top Picture-in-Picture window.

Uses the EaseMe Solutions hex logo from [easeme.eu](https://www.easeme.eu/) as a single icon asset.

## Install in Chrome or Microsoft Edge

1. [Download the source ZIP](https://github.com/istvanamolnar/afloat/archive/refs/heads/main.zip) and extract it to a folder you will keep, such as `Documents\Afloat`.
2. Open `chrome://extensions` in Chrome or `edge://extensions` in Microsoft Edge and enable **Developer mode**.
3. Click **Load unpacked** and select the `extension` folder inside the extracted repository (the folder containing `manifest.json`).
4. Pin **Afloat** to your toolbar using the browser's Extensions menu.

No account, payment, build step, or Node.js installation is needed to use this source download. The browser loads `extension/` directly.

Keep the extracted folder in place. Updates are manual: replace its files with a newer release, then click **Reload** on Afloat's card in the browser's extensions page. The ZIP is for extraction and loading in Developer mode, not a one-click store installer.

If you cloned the source repository, select its `extension` folder directly instead of downloading the ZIP.

For a ready-made extension ZIP and SHA-256 checksum, open a successful run under [Build and package](https://github.com/istvanamolnar/afloat/actions/workflows/build.yml) and download **Artifacts → afloat-package**. [GitHub requires sign-in to download workflow artifacts](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/download-workflow-artifacts). Extract the artifact, then extract the enclosed extension ZIP and load its folder containing `manifest.json`. Build artifacts are retained for 90 days; the source download above remains available without signing in.

## Use

Play a YouTube video, then click **Afloat**. The same video continues in the browser's floating Picture-in-Picture window. Move or resize it, switch apps, and keep watching. Click Afloat again, or close the floating window, to return the picture to its tab.

Shortcut: **Alt + Shift + P** while the browser is focused. Customize it at `chrome://extensions/shortcuts` or `edge://extensions/shortcuts` if another extension already uses it. Keep the YouTube tab open.

If the icon shows **!**, hover over it for the reason. Start playback and try again.

Exclusive-fullscreen games or apps may cover the floating window; use their **borderless fullscreen** mode in that case.

## Privacy

When you invoke Afloat, it locally inspects video elements and their playback state and size to select a video. That data is not stored or transmitted by the extension. No accounts, analytics, or extension servers are used. Only `activeTab` and `scripting` permissions are requested. Read the [privacy policy](PRIVACY.md) for the full disclosure.

## Publishing

See [PUBLISHING.md](PUBLISHING.md) for both stores' submission steps, policy hosting, and remaining manual tasks. Copy-ready descriptions and disclosures are in [store/](store/). Both stores use the same ZIP and single application icon.

Chrome Web Store publication is deferred for now. [Microsoft Edge Add-ons has no registration fee](https://learn.microsoft.com/en-us/microsoft-edge/extensions/publish/create-dev-account), but still requires a developer account, verification, and extension review. The GitHub download above works in either browser without store publication.

For support or security reports, contact [EaseMe Solutions](https://www.easeme.eu/en/contact). See [SECURITY.md](SECURITY.md).

## License

The source code and documentation are licensed under the [MIT license](LICENSE). The EaseMe name, logo (`extension/icon.png`), and branded promotional artwork (`store/assets/promo-440x280.png`) are excluded from that license; all rights to those assets are reserved.

## Development

There is no compilation step or runtime dependency. `extension/` is ready to load. To validate and generate the ZIP and checksum locally, run:

```sh
npm run build
```

[GitHub Actions](https://github.com/istvanamolnar/afloat/actions/workflows/build.yml) does this automatically for pushes to `main` and pull requests. It validates the source, runs the Chrome and Edge browser regression tests, and uploads the ZIP and checksum as a workflow artifact only after success. The workflow has read-only repository access and never commits generated files. No manual zipping is needed.

- `node scripts/check.mjs` checks the manifest, assets, and syntax.
- `node scripts/browser-test.mjs` tests real Picture-in-Picture playback and security regressions in a separate Chrome profile.
- `node scripts/browser-test.mjs edge` runs the same checks in a separate Microsoft Edge profile.
- Browser tests need Playwright available locally (for example `npm install --no-save playwright@1.62.1`), or `PLAYWRIGHT_MODULE_PATH` set to an existing package directory. Set `BROWSER_EXECUTABLE` if installed elsewhere. The existing `CHROME_EXECUTABLE` override is also supported.
- `npm run build` (or `node scripts/package.mjs`) validates and creates `dist/afloat-1.0.1.zip` and its SHA-256 checksum for GitHub downloads or either store (Windows). Packaged text files use LF line endings, and ZIP entry order and timestamps are fixed, so local and CI builds produce the same archive from unchanged inputs. Packaging failures preserve the previous ZIP.

`dist/` is generated build output and is ignored by Git. A local build recreates it; CI creates it only on its runner. When releasing a new version, update both version fields and push the source. The workflow generates the new versioned package automatically.

The browser test uses a locally generated video; no YouTube account or network access is required.
