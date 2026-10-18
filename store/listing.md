# Store listing copy

These fields describe release 1.0.1. Both stores use the same extension ZIP and `extension/icon.png`. Use the Chrome-specific paragraph in Chrome and the Edge-specific paragraph in Edge.

## Name

Afloat — Floating Video

## Short description

One click to keep your YouTube video in an always-on-top Picture-in-Picture window.

## Long description — shared copy

Keep your video in view while you work.

Afloat opens the video you are already watching in a small, movable Picture-in-Picture window. Your existing player keeps running, so your playback position and audio continue. Click the toolbar button again, or close the floating window, to return the picture to its original tab.

Features:
- One-click floating video.
- Alt+Shift+P keyboard shortcut while the browser is focused.
- Move and resize the native video window.
- An ON badge while the video is floating.
- No accounts, analytics, advertisements, or extension servers.

How to use:
1. Open YouTube and start a video.
2. Click Afloat in your toolbar, or press Alt+Shift+P.
3. Switch to your other task and keep watching.
4. Keep the original video tab open. Close the floating window or click Afloat again to return the picture to that tab.

Afloat uses the browser's existing Picture-in-Picture feature. It does not download videos, block ads, bypass paid access, or override website restrictions. Some protected, embedded, or unsupported players cannot be floated. Exclusive-fullscreen games may cover the floating window; use borderless fullscreen in those applications.

Privacy: when you invoke Afloat, it locally inspects video elements and their playback state and size to choose the video. This information stays in your browser and is not stored or transmitted by the extension. Only the activeTab and scripting permissions are requested.

Afloat is developed by EaseMe Solutions and is not affiliated with or endorsed by YouTube or Google. YouTube is a trademark of Google LLC.

### Chrome-only final paragraph

Requires desktop Google Chrome. Customize the shortcut at chrome://extensions/shortcuts. Chrome controls the floating window's appearance and behavior.

### Edge-only final paragraph

Requires desktop Microsoft Edge. Customize the shortcut at edge://extensions/shortcuts. Microsoft Edge controls the floating window's appearance and behavior. Afloat is not affiliated with or endorsed by Microsoft.

## Category

Productivity, if available in the dashboard's current category list.

## Language

English (en).

## Privacy policy URL

Use the public, rendered privacy policy in both store dashboards:

https://github.com/istvanamolnar/afloat/blob/main/PRIVACY.md

Keep this URL public and readable without signing in. GitHub Pages is an optional alternative, not a requirement for the extension.

## Support URL

https://www.easeme.eu/en/contact

## Website URL

https://github.com/istvanamolnar/afloat

This field is optional in the stores.

## Reviewer testing notes

No extension account, credentials, remote service, or payment is required. Open a public YouTube watch page accessible to your region, start playback, and invoke Afloat with its toolbar button. Verify that the same video enters the native Picture-in-Picture window, continues playing while another tab is active, and returns when the toolbar action is clicked again. Verify Alt+Shift+P while the browser is focused. Closing the native PiP window should clear the ON badge.

The injected function runs in the extension's isolated world and operates on the existing HTML video element. No media URLs are extracted. A website's `disablePictureInPicture` and Permissions-Policy restrictions remain in force. On pages with no supported video, the toolbar shows ! and its tooltip explains what to do.

## Release notes

Hardened Picture-in-Picture status handling against synthetic close events. Playback and toolbar behavior verified in desktop Chrome and Microsoft Edge.

## Images

- Extension/store icon: `extension/icon.png` (128 × 128). Reuse this single icon; no alternative icon sizes are required by this project.
- Small promotional image: `store/assets/promo-440x280.png`.
- Store screenshot: save a genuine manual capture as `store/assets/screenshot-1280x800.png`; it has not been captured yet.

See `store/README.md` for image provenance and upload details.
