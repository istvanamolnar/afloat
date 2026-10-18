# Store assets

Store images are uploaded separately and are not part of the extension ZIP.

| Asset | Source | Chrome | Edge |
| --- | --- | --- | --- |
| Icon, 128 × 128 | `../extension/icon.png` | Required; already packaged | Reuse as listing logo; meets documented minimum |
| Promo, 440 × 280 | `assets/promo-440x280.png` | Required | Optional; reuse the same image |
| Genuine screenshot, 1280 × 800 | `assets/screenshot-1280x800.png` | At least one required; prepared locally | Optional, but recommended |

The promotional tile uses the EaseMe hex logo and code-drawn window outlines. It is marketing artwork, not a screenshot or an additional application icon.

## Screenshot provenance

`assets/screenshot-1280x800.png` comes from a genuine user-provided capture of the native Picture-in-Picture window. The account/navigation header and outer page were cropped away. Gaussian blur obscures the lower channel, subscription, interaction, and personalized-playlist area while preserving the overlapping PiP window.

Only cropping, local blurring, and uniform resizing were applied. The actual PiP frame, video, text, and controls were not regenerated or rearranged. Pixel comparisons verified that the original PiP pixels and every pixel outside the blur region were unchanged before resizing. The export is an opaque RGB PNG at **1280 × 800**, with embedded metadata removed.

Only the redacted export belongs in the repository; the original capture remains outside it. Review the export and confirm rights to the displayed video content before public distribution. The code's MIT license does not grant rights to third-party video content shown in a screenshot.

## Future screenshots

1. Play a video you own or have permission to use in marketing. Avoid private information or copyrighted YouTube footage you cannot redistribute.
2. Invoke Afloat, then switch to a harmless task while the real floating video remains visible. Keep native controls or browser chrome visible enough to explain the behavior.
3. Capture the actual experience with your normal screenshot tool. Crop to **1280 × 800**, full bleed with square corners and no padding. This size works in both stores. Chrome also accepts 640 × 400.
4. Blur personal details or crop them out, preserving the real UI. Save a replacement only after review and upload it in the listing form. Do not invent controls or promise that exclusive-fullscreen games are always supported.

Sources: [Chrome images](https://developer.chrome.com/docs/webstore/images), [Edge listing images](https://learn.microsoft.com/en-us/microsoft-edge/extensions/publish/publish-extension#enter-properties-for-a-language).
