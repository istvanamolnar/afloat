# Publishing Afloat to Chrome and Edge

Release **1.0.1** uses the **same ZIP for both stores**: `dist/afloat-1.0.1.zip`.

The security fix, policy, listing text, permission explanations, icon, and promotional tile are prepared. The public repository hosts the privacy policy. A genuine screenshot with privacy redactions is prepared locally. Publisher review and account/submission actions remain manual. Google and Microsoft determine store approval.

## GitHub download — current distribution

Chrome Web Store publication is deferred for now. The [README](README.md#install-in-chrome-or-microsoft-edge) links to GitHub's source ZIP and explains extraction and **Developer mode → Load unpacked** using the repository's `extension` folder. This requires no account, store payment, or build tools, and updates are manual.

The [Build and package workflow](https://github.com/istvanamolnar/afloat/actions/workflows/build.yml) automatically validates the source, runs the Chrome and Edge regressions, and uploads the ZIP and checksum as an artifact on successful pushes to `main` and pull requests. Open a successful run and download **Artifacts → afloat-package**. Extract the artifact to get `afloat-1.0.1.zip` and its checksum, then extract the extension ZIP for manual installation or upload that inner ZIP to a store. [GitHub requires sign-in for artifact downloads](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/download-workflow-artifacts). Artifacts are retained for 90 days; run the workflow again if a fresh artifact is needed after expiry.

`dist/` is temporary build output, ignored by Git and excluded from the source repository. A local build recreates it; CI creates it on its runner. The workflow never commits packages back to Git. For a new release, update both version fields and push the source changes. No manual ZIP creation, staging, or ignore-file update is needed. Store images and test profiles do not belong in the ZIP.

Microsoft's [Edge developer registration documentation](https://learn.microsoft.com/en-us/microsoft-edge/extensions/publish/create-dev-account) confirms that the Edge extension program has **no registration fee**. Account verification and certification still apply if you choose to publish there.

## 1. Publish the repository and privacy policy

Repository: [istvanamolnar/afloat](https://github.com/istvanamolnar/afloat). The local `origin` remote points to this repository and releases use `main`. Use this rendered public policy URL in both store dashboards:

https://github.com/istvanamolnar/afloat/blob/main/PRIVACY.md

Check the URL in a signed-out/private browser window before submission: it must remain readable without authentication. Keep it available while the extension is distributed. Do not submit an edit URL, local path, or private repository URL.

A public GitHub file provides an accessible HTTPS policy page; the cited store policies do not require a custom domain. **GitHub Pages is optional**, and no separate paid hosting is needed. To use Pages, configure a source in **Settings → Pages**, publish the same policy there, then verify the resulting live URL before using it.

Review `PRIVACY.md` and confirm the publisher name and EaseMe contact route. The policy explains local video metadata processing and no storage or off-device transmission. Update the policy and dashboard disclosures together if behavior changes.

The source code and documentation use the repository's MIT license. The EaseMe name, logo, and branded promotional artwork are excluded; see the README's license section. Keep credentials, signing keys, and private information out of the repository.

## Publisher and contact review

These are the values prepared in the project; they do not configure your developer accounts automatically.

| Detail | Prepared value | Where to review |
| --- | --- | --- |
| Publisher shown in the policy and description | EaseMe Solutions | [PRIVACY.md](PRIVACY.md) and [store/listing.md](store/listing.md) |
| Public support and privacy contact | `https://www.easeme.eu/en/contact` | [PRIVACY.md](PRIVACY.md), [SECURITY.md](SECURITY.md), [README.md](README.md), and [store/listing.md](store/listing.md) |
| Privacy policy URL | `https://github.com/istvanamolnar/afloat/blob/main/PRIVACY.md` | Both store dashboards' privacy fields |
| Optional extension website | `https://github.com/istvanamolnar/afloat` | Both store listings |
| Copyright holder | `2026 istvanamolnar` | [LICENSE](LICENSE); confirm that this identifies the actual rights holder |

**Chrome:** Open the [Developer Dashboard](https://chrome.google.com/webstore/devconsole) and select **Account**. Review publisher name, verified contact email, and the identity/trader information requested for your account. Chrome's account documentation says the verified contact email is displayed with the extension's contact information. Use an address you monitor and intend to make public. Open the Afloat item and review **Store listing** (description, images, homepage, support URL), **Privacy practices** (policy URL and disclosures), and the listing preview before submitting.

**Edge:** Open [Partner Center](https://partner.microsoft.com/dashboard/microsoftedge/overview), then **Settings (gear) → Developer settings → Contact info** to review publisher and contact details. In the account settings, **Legal info** shows business/verification information. For Afloat, review **Properties** (website and support contact), **Privacy**, and **Store listings**. The publisher name, website, and support contact appear publicly in Edge Add-ons.

Account verification details and contact emails are entered in the dashboards; no publisher email, legal address, or trader declaration is configured by this repository. Review what the dashboards identify as public before submitting. Public Git commits also contain author identity metadata; [GitHub email settings](https://github.com/settings/emails) let you choose a no-reply address for future commits if desired.

## 2. Check and package

Push source changes to `main` to run the full automated pipeline. For a local validation and package build:

```powershell
npm run build
```

The build command runs validation before packaging; CI also requires `npm test` and `npm run test:edge` to pass before uploading the artifact. The workflow installs its browser-test tooling automatically. Local browser tests require Playwright; see README for setup and executable overrides. Their temporary-profile flags are development tools, not part of the extension or instructions for users.

ZIP entries use a fixed order and timestamp for repeatable output. The packager writes a temporary archive and replaces the previous ZIP only after successful creation. The workflow has read-only repository access; it uploads artifacts without changing any Git branch.

The packaging script includes the contents of `extension/` and the repository's `LICENSE` in the ZIP. Do not upload the repository, `.git`, test profiles, or store materials as the extension package.

Also manually test a real public YouTube video, ads, a paused video, and Shorts in both browsers, plus your actual other application in normal/borderless-fullscreen modes. Automated tests use original generated media. Protected/embedded players and exclusive-fullscreen applications can impose additional restrictions.

## 3. Copy the prepared listing and disclosures

- `store/listing.md`: title, descriptions, release notes, and reviewer instructions. Use the correct browser-specific paragraph.
- `store/privacy-disclosures.md`: single purpose, permission justifications, remote-code answer, and data-use declarations.
- Privacy URL: `https://github.com/istvanamolnar/afloat/blob/main/PRIVACY.md`.
- Support URL: `https://www.easeme.eu/en/contact`, or another support route you actually maintain. Enter the required publisher/contact email yourself.
- Optional website URL: `https://github.com/istvanamolnar/afloat`.
- Icon: `extension/icon.png`. Small promo: `store/assets/promo-440x280.png`.
- Genuine screenshot: `store/assets/screenshot-1280x800.png`, prepared locally from the user's capture with privacy redactions and kept local pending publisher review. Review it before public distribution; provenance is in the local `store/README.md`.

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
- [x] Source ZIP download and workflow artifact install instructions prepared.
- [x] Automatic build, browser checks, and ZIP/checksum artifact uploads configured in GitHub Actions.
- [x] Genuine store screenshot, cropped and privacy-redacted locally.
- [ ] Publisher review of identity, contact details, rights, policy, and certifications.
- [ ] Publisher accounts, verification, upload, and final submission.

## Official references checked 18 October 2026

- [Chrome publication](https://developer.chrome.com/docs/webstore/publish)
- [Chrome publisher account fields](https://developer.chrome.com/docs/webstore/set-up-account)
- [Chrome listing fields](https://developer.chrome.com/docs/webstore/cws-dashboard-listing)
- [Chrome privacy fields](https://developer.chrome.com/docs/webstore/cws-dashboard-privacy)
- [Chrome local-data FAQ](https://developer.chrome.com/docs/webstore/program-policies/user-data-faq)
- [Chrome images](https://developer.chrome.com/docs/webstore/images)
- [Chrome two-step verification](https://developer.chrome.com/docs/webstore/program-policies/policies#2-step-verification)
- [Edge publication](https://learn.microsoft.com/en-us/microsoft-edge/extensions/publish/publish-extension)
- [Edge registration and fee](https://learn.microsoft.com/en-us/microsoft-edge/extensions/publish/create-dev-account)
- [Edge account and contact settings](https://learn.microsoft.com/en-us/microsoft-edge/extensions/publish/manage-settings)
- [Edge business verification](https://learn.microsoft.com/en-us/microsoft-edge/extensions/publish/verify-microsoft-edge-program)
- [GitHub Pages setup](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
