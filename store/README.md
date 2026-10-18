# Store assets

Store images are uploaded separately and are not part of the extension ZIP.

| Asset | Source | Chrome | Edge |
| --- | --- | --- | --- |
| Icon, 128 × 128 | `../extension/icon.png` | Required; already packaged | Reuse as listing logo; meets documented minimum |
| Promo, 440 × 280 | `assets/promo-440x280.png` | Required | Optional; reuse the same image |
| Genuine screenshot, 1280 × 800 | Capture manually before submission | At least one required | Optional, but recommended |

The promotional tile uses the EaseMe hex logo and code-drawn window outlines. It is marketing artwork, not a screenshot or an additional application icon.

## Remaining manual screenshot

Automated native-window capture was stopped because computer-use could not determine the browser URL confidently. No native PiP screenshot was produced. Do not submit a mockup as a genuine capture.

1. Play a video you own or have permission to use in marketing. Avoid private information or copyrighted YouTube footage you cannot redistribute.
2. Invoke Afloat, then switch to a harmless task while the real floating video remains visible. Keep native controls or browser chrome visible enough to explain the behavior.
3. Capture the actual experience with your normal screenshot tool. Crop to **1280 × 800**, full bleed with square corners and no padding. This size works in both stores. Chrome also accepts 640 × 400.
4. Save as `store/assets/screenshot-1280x800.png` and upload it in the listing form. Do not invent controls or promise that exclusive-fullscreen games are always supported.

Sources: [Chrome images](https://developer.chrome.com/docs/webstore/images), [Edge listing images](https://learn.microsoft.com/en-us/microsoft-edge/extensions/publish/publish-extension#enter-properties-for-a-language).
