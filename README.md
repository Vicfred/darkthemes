# Competitive Programming Dark Themes

A small collection of browser extensions that give several competitive programming sites a cleaner dark interface.

The Codeforces and AtCoder themes are based on the **Monokai / Molokai** colour palette. The CSES extension provides a simple site-specific dark theme that works without logging in or relying on CSES theme cookies.

## Extensions

| Extension | Site | Highlights |
| --- | --- | --- |
| **Codeforces Molokai Dark** | [Codeforces](https://codeforces.com/) | Molokai UI, readable MathJax, syntax highlighting, rating colours, dark tables, filters, contests, submissions, and blogs |
| **AtCoder Molokai Dark** | [AtCoder](https://atcoder.jp/) | Molokai UI, neon rating graphs, readable maths, syntax highlighting, dark submission editor, contests, standings, and profiles |
| **CSES Dark Theme** | [CSES](https://cses.fi/) | Lightweight dark theme that works without logging in or preserving CSES theme cookies |

## Repository structure

```text
darkthemes/
├── atcoder-molokai-dark/
├── codeforces-molokai-dark/
├── cses-always-dark/
└── README.md
```

Each extension is independent and contains its own `manifest.json`, source files, and README.

## Installation

These extensions can be loaded locally in Chromium-based browsers.

1. Clone or download this repository.
2. Open:

   ```text
   chrome://extensions
   ```

   or, in Brave:

   ```text
   brave://extensions
   ```

3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the directory of the extension you want to install, for example:

   ```text
   codeforces-molokai-dark/
   ```

6. Reload the corresponding website.

Repeat the process for any other theme you want to use.

## Privacy

These extensions are purely visual. They:

- collect no data;
- use no analytics;
- send nothing anywhere;
- request no unnecessary permissions;
- only run on their corresponding competitive programming sites.

## Development

After changing an extension's CSS, JavaScript, or manifest:

1. Open the browser extensions page.
2. Click **Reload** on that extension.
3. Refresh the site you are testing.

## Disclaimer

These are unofficial visual themes and are not affiliated with or endorsed by Codeforces, AtCoder, or CSES.
