# Privacy and permission fields — both stores

Keep these entries consistent with `PRIVACY.md`. They describe the code in release 1.0.1, not hypothetical future features. Local processing is still data handling under store policies; do not claim that Afloat never accesses website content.

## Single purpose

Let the user put the current video into the browser's native Picture-in-Picture window and return it to its original tab using a toolbar button or keyboard shortcut.

## activeTab justification

Afloat needs temporary access to the tab the user explicitly invokes it on to locate an existing video and determine whether that video can enter Picture-in-Picture. It reads only the video readiness, playback state, dimensions, displayed size, and Picture-in-Picture state needed for that action. It does not request persistent host access, collect browsing history, or transmit tab data.

## scripting justification

Afloat executes its packaged, self-contained video-selection and Picture-in-Picture function in the active tab's isolated world after a toolbar click or keyboard shortcut. This invokes the browser's native video API on the existing player. All executable code is included in the extension package.

## Remote code

No, the extension does not use remote code. It does not fetch scripts, run remotely supplied commands, or use eval. The website's own player is not code fetched or executed by Afloat.

## Data use

Declare **Website content** for the local processing of video elements and video metadata. Explain that use as follows wherever the dashboard permits supplementary text:

> Afloat locally processes video elements, video readiness, playback status, dimensions, displayed size, and Picture-in-Picture state only to provide the user-requested floating-video feature. This information is not stored, synchronized, sent to the developer, or shared with third parties. The extension has no analytics, advertising, user accounts, or network requests of its own.

Other data categories are not collected by the extension: personally identifiable information, health information, financial/payment information, authentication information, personal communications, location, browsing history, or behavioral/interaction tracking.

The local browser tab identifier used to route an action and update its badge is temporary internal state, not a browsing-history database or persistent user identifier. Playback state is inspected only to choose and control the current video presentation; it is not used for behavioral analytics.

Review the dashboard's current wording carefully. If it distinguishes local processing from off-device collection, state both facts accurately: website/video content is processed locally, and no information is collected off-device by Afloat. Do not mislabel local DOM access as no data access at all.

## Limited Use certifications

The current extension can truthfully certify that:

- User data is not sold or transferred to third parties.
- Data is used only for the disclosed floating-video feature.
- Data is not used for creditworthiness or lending.
- Data is not used for advertising, tracking, or unrelated analytics.
- Data is not available for humans to read through the extension.

The publisher must personally review the store's certification statements before checking them. Support correspondence and the website/store provider's independent processing are explained separately in the policy.

## Privacy policy

Use the public HTTPS URL of the published repository's `PRIVACY.md`, or an optional GitHub Pages version. The URL must open without sign-in and remain available while the extension is distributed. The same policy covers both stores.

## Official references

- [Chrome privacy fields](https://developer.chrome.com/docs/webstore/cws-dashboard-privacy)
- [Chrome User Data FAQ — local processing](https://developer.chrome.com/docs/webstore/program-policies/user-data-faq)
- [Microsoft Edge privacy submission fields](https://learn.microsoft.com/en-us/microsoft-edge/extensions/publish/publish-extension#step-6-enter-privacy-information)
