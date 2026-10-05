# Codeforces Molokai Dark

A small Manifest V3 Chrome extension that gives Codeforces a dark theme based on the Monokai/Molokai colour palette.

## Install locally

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select this directory.
5. Reload Codeforces.

## v0.3.2

Current fixes include:

- restrained Molokai page, panel, table and form colours;
- dark Codeforces contest-filter widgets, including dynamically generated dropdowns;
- the original Codeforces logo is left untouched;
- Codeforces rating colours are adapted for the dark palette;
- sidebar `rtable` rating widgets now force the same rank colours as normal rating tables;
- legendary users no longer keep Codeforces' black first letter on a dark background.

The extension uses a stylesheet plus a small content script for Codeforces widgets that are generated dynamically.
It requests no additional permissions.


## v0.3.3

- Fix MathJax/LaTeX colours on dark problem statements, including SVG-rendered formulae.
