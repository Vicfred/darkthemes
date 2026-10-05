# CSES Dark Theme

A tiny Chrome/Brave extension that forces a dark theme on [CSES](https://cses.fi/) without requiring a login or relying on CSES theme cookies.

It applies a local stylesheet directly to CSES pages, so there are no redirects, no flashing between themes, and no need to enable dark mode manually.

## Installation

1. Clone or download this repository.
2. Open:

   ```text
   brave://extensions
   ```

   or:

   ```text
   chrome://extensions
   ```

3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the directory containing `manifest.json`.
6. Reload CSES.

## Project structure

```text
cses-dark-theme/
├── manifest.json
├── dark.css
└── README.md
```

- `manifest.json` — Manifest V3 extension configuration.
- `dark.css` — dark theme applied to CSES pages.

## Privacy

This extension:

- collects no data;
- uses no analytics;
- sends nothing anywhere;
- requests no additional permissions;
- only runs on `https://cses.fi/*`.

## Disclaimer

This is an unofficial visual theme for CSES and is not affiliated with or endorsed by CSES.
