# Benjamin Liang Portfolio

This repository now serves the lanyard portfolio from the root for GitHub Pages.

- `index.html` and `assets/` are the built production site served by GitHub Pages.
- `portfolio-source/` contains the editable Vite/React source for future changes.
- `old-website/` preserves the previous Flutter/static website and is not used by the live site.

To edit locally:

```bash
cd portfolio-source
npm install
npm run dev
```

To rebuild the live root files after editing:

```bash
cd portfolio-source
npm run build
cp dist/index.html ../index.html
cp -R dist/assets ../assets
```
