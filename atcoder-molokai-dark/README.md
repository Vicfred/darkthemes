# AtCoder Molokai Dark

A lightweight Chrome extension that gives [AtCoder](https://atcoder.jp/) a dark theme inspired by the **Monokai / Molokai** colour palette.

It keeps the familiar AtCoder layout while restyling contests, tasks, submissions, profiles, graphs, maths, and source code into a cleaner dark interface.

## Features

- Monokai / Molokai-inspired dark palette
- Dark styling for:
  - home page
  - contest pages
  - task/problem statements
  - standings and rankings
  - submission pages
  - profiles
  - forms, tables, dropdowns, panels, and modals
- Readable MathJax / LaTeX
- Monokai syntax highlighting for displayed source code
- Dark submission editor and task/language selectors
- Neon rating and rating-distribution graphs
- Improved AtCoder rating colours on dark backgrounds
- Dark contest hero and registration / virtual participation areas
- Support for dynamically generated AtCoder UI
- No extra Chrome permissions

## Installation

1. Clone or download this repository.
2. Open Chrome and go to:

   ```text
   chrome://extensions
   ```

3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the directory containing `manifest.json`.
6. Reload AtCoder.

## Project structure

```text
atcoder-molokai-dark/
├── manifest.json
├── styles.css
├── content.js
└── README.md
```

- `manifest.json` — Manifest V3 extension configuration.
- `styles.css` — main Molokai theme and AtCoder-specific styling.
- `content.js` — fixes dynamically generated UI and canvas-based profile graphs.

## Privacy

This extension:

- collects no data;
- uses no analytics;
- sends nothing anywhere;
- requests no additional Chrome permissions;
- only runs on AtCoder pages declared in `manifest.json`.

## Development

After editing `styles.css`, `content.js`, or `manifest.json`:

1. Reload the extension from `chrome://extensions`.
2. Refresh the AtCoder page you are testing.

It is worth checking contests, tasks, submissions, standings, rankings, profiles, rating graphs, and displayed source code because AtCoder uses several different UI components.

## Disclaimer

This is an unofficial visual theme for AtCoder and is not affiliated with or endorsed by AtCoder.
