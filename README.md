# Afloat

Lightweight Chromium extension that keeps your current video in an always-on-top Picture-in-Picture window.

Uses the EaseMe Solutions hex logo from [easeme.eu](https://www.easeme.eu/) as a single icon asset.

## Install in Chrome or Microsoft Edge

1. Open `chrome://extensions` in Chrome or `edge://extensions` in Microsoft Edge and enable **Developer mode**.
2. Click **Load unpacked** and select this project's `extension` folder.
3. Pin **Afloat** to your toolbar using the browser's Extensions menu.

## Use

Play a YouTube video, then click **Afloat**. The same video continues in the browser's floating Picture-in-Picture window. Move or resize it, switch apps, and keep watching. Click Afloat again, or close the floating window, to return the picture to its tab.

Shortcut: **Alt + Shift + P** while the browser is focused. Customize it at `chrome://extensions/shortcuts` or `edge://extensions/shortcuts` if another extension already uses it. Keep the YouTube tab open.

If the icon shows **!**, hover over it for the reason. Start playback and try again.

Exclusive-fullscreen games or apps may cover the floating window; use their **borderless fullscreen** mode in that case.

## Privacy

When you invoke Afloat, it locally inspects video elements and their playback state and size to select a video. That data is not stored or transmitted by the extension. No accounts, analytics, or extension servers are used. Only `activeTab` and `scripting` permissions are requested. Read the [privacy policy](PRIVACY.md) for the full disclosure.

## Publishing

See [PUBLISHING.md](PUBLISHING.md) for both stores' submission steps, policy hosting, and remaining manual tasks. Copy-ready descriptions and disclosures are in [store/](store/). Both stores use the same ZIP and single application icon.

For support or security reports, contact [EaseMe Solutions](https://www.easeme.eu/en/contact). See [SECURITY.md](SECURITY.md).

## License

The source code and documentation are licensed under the [MIT license](LICENSE). The EaseMe name, logo (`extension/icon.png`), and branded promotional artwork (`store/assets/promo-440x280.png`) are excluded from that license; all rights to those assets are reserved.

## Development

No build step or runtime dependencies. `extension/` is ready to load.

- `node scripts/check.mjs` checks the manifest, assets, and syntax.
- `node scripts/browser-test.mjs` tests real Picture-in-Picture playback and security regressions in a separate Chrome profile.
- `node scripts/browser-test.mjs edge` runs the same checks in a separate Microsoft Edge profile.
- Browser tests need Playwright available locally (for example `npm install --no-save playwright@1.62.1`), or `PLAYWRIGHT_MODULE_PATH` set to an existing package directory. Set `BROWSER_EXECUTABLE` if installed elsewhere. The existing `CHROME_EXECUTABLE` override is also supported.
- `node scripts/package.mjs` creates `dist/afloat-1.0.1.zip` for either store (Windows).

The browser test uses a locally generated video; no YouTube account or network access is required.
