# Publishing Afloat to Chrome and Edge

Release **1.0.1** uses the **same ZIP for both stores**: `dist/afloat-1.0.1.zip`.

The security fix, policy, listing text, permission explanations, icon, and promotional tile are prepared. The public repository hosts the privacy policy. A genuine screenshot and publisher account/submission actions remain manual. Google and Microsoft determine store approval.

## 1. Publish the repository and privacy policy

Repository: [istvanamolnar/afloat](https://github.com/istvanamolnar/afloat). The local `origin` remote points to this repository and releases use `main`. Use this rendered public policy URL in both store dashboards:

https://github.com/istvanamolnar/afloat/blob/main/PRIVACY.md

Check the URL in a signed-out/private browser window before submission: it must remain readable without authentication. Keep it available while the extension is distributed. Do not submit an edit URL, local path, or private repository URL.

A public GitHub file provides an accessible HTTPS policy page; the cited store policies do not require a custom domain. **GitHub Pages is optional**, and no separate paid hosting is needed. To use Pages, configure a source in **Settings → Pages**, publish the same policy there, then verify the resulting live URL before using it.

Review `PRIVACY.md` and confirm the publisher name and EaseMe contact route. The policy explains local video metadata processing and no storage or off-device transmission. Update the policy and dashboard disclosures together if behavior changes.

The source code and documentation use the repository's MIT license. The EaseMe name, logo, and branded promotional artwork are excluded; see the README's license section. Keep credentials, signing keys, and private information out of the repository.

## 2. Check and package

```powershell
node scripts/check.mjs
node scripts/browser-test.mjs
node scripts/browser-test.mjs edge
node scripts/package.mjs
```

Browser tests require Playwright; see README for setup and executable overrides. Their temporary-profile flags are development tools, not part of the extension or instructions for users.

The packaging script includes the contents of `extension/` and the repository's `LICENSE` in the ZIP. Do not upload the repository, `.git`, test profiles, or store materials as the extension package.

Also manually test a real public YouTube video, ads, a paused video, and Shorts in both browsers, plus your actual other application in normal/borderless-fullscreen modes. Automated tests use original generated media. Protected/embedded players and exclusive-fullscreen applications can impose additional restrictions.

## 3. Copy the prepared listing and disclosures

- `store/listing.md`: title, descriptions, release notes, and reviewer instructions. Use the correct browser-specific paragraph.
- `store/privacy-disclosures.md`: single purpose, permission justifications, remote-code answer, and data-use declarations.
- Privacy URL: `https://github.com/istvanamolnar/afloat/blob/main/PRIVACY.md`.
- Support URL: `https://www.easeme.eu/en/contact`, or another support route you actually maintain. Enter the required publisher/contact email yourself.
- Optional website URL: `https://github.com/istvanamolnar/afloat`.
- Icon: `extension/icon.png`. Small promo: `store/assets/promo-440x280.png`.
- Genuine screenshot: capture as described in `store/README.md`. This remains manual after the native capture safety stop.

Confirm rights to the EaseMe logo and any public screenshot footage. Do not imply endorsement by YouTube, Google, or Microsoft.

Local processing is still data handling. The prepared disclosures identify **Website content** as locally processed video elements/metadata and explain that no data is stored, sent to the developer, or shared. Review the dashboard's exact current categories and personally certify only accurate statements.

## 4. Chrome Web Store — manual steps

1. Register/verify your developer account. Enable required two-step verification and complete publisher/contact and any applicable business/trader verification. Pay any registration charge presented by Google yourself.
2. Create a new item in the [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole).
3. Upload `dist/afloat-1.0.1.zip`.
4. Complete Store listing, Privacy practices, Distribution, and Test instructions using the prepared files. An icon, small promotional tile, and at least one screenshot are required.
5. Review the preview, policy URL, countries, publisher identity, and certifications. Choose deferred publication if you want a separate publish decision after approval.
6. Submit for review after checking these items. Maintain access to the publisher account and contact inbox.

## 5. Microsoft Edge Add-ons — manual steps

1. Register for the Edge extension developer program in [Partner Center](https://partner.microsoft.com/dashboard/microsoftedge/overview), including the account/company/contact verification Microsoft requests.
2. Create a new extension and upload **the same** `dist/afloat-1.0.1.zip`.
3. Complete availability, properties, Privacy, and the English listing. Use Edge-specific wording, the live policy URL, the same 128 × 128 icon, and the prepared disclosures. Screenshots/promo are optional in the documented Edge form, but can be reused for a complete listing.
4. Copy the reviewer testing notes into certification notes. No Afloat credentials are needed.
5. Review and submit for certification. Chrome and Edge reviews are separate; upload future updates to both stores.

This source has no `update_url` or hard-coded store extension ID. No application-code fork is required. Do not put Chrome-only store links in the Edge listing.

## Release status

- [x] Security fix and regression checks in both browsers.
- [x] Shared extension package and single EaseMe application icon.
- [x] Privacy policy, descriptions, disclosures, and reviewer instructions.
- [x] Small promotional tile.
- [x] Public repository and verified live privacy URL.
- [ ] Genuine store screenshot.
- [ ] Publisher review of identity, contact details, rights, policy, and certifications.
- [ ] Publisher accounts, verification, upload, and final submission.

## Official references checked 18 October 2026

- [Chrome publication](https://developer.chrome.com/docs/webstore/publish)
- [Chrome privacy fields](https://developer.chrome.com/docs/webstore/cws-dashboard-privacy)
- [Chrome local-data FAQ](https://developer.chrome.com/docs/webstore/program-policies/user-data-faq)
- [Chrome images](https://developer.chrome.com/docs/webstore/images)
- [Chrome two-step verification](https://developer.chrome.com/docs/webstore/program-policies/policies#2-step-verification)
- [Edge publication](https://learn.microsoft.com/en-us/microsoft-edge/extensions/publish/publish-extension)
- [GitHub Pages setup](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
