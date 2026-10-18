# Security

Report suspected security problems privately through [EaseMe support](https://www.easeme.eu/en/contact). Include the extension version, browser version, reproduction steps, and expected impact. Do not post credentials or private browsing information in public issues.

## Security model

- Manifest V3 with `activeTab` and `scripting` only.
- Code runs on explicit user invocation, in the extension's isolated world in the top frame.
- No externally connectable webpage API, remote code, runtime dependencies, persistent user storage, or extension network calls.
- Runtime messages are limited to a fixed close-status notification and validated against the extension ID, top frame, and sender tab.
- Synthetic Picture-in-Picture close events are ignored without consuming the genuine close listener.
- Browser and site Picture-in-Picture restrictions are respected.

The release checks cover playback, page script isolation, spoofed close events, and genuine close behavior in desktop Chrome and Microsoft Edge. They are targeted regression tests, not a guarantee against every browser or website vulnerability. Exclusive-fullscreen applications and protected or embedded players may have additional platform restrictions.
