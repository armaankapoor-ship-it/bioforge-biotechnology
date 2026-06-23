# Make BioForge available to friends anywhere

Local links like `127.0.0.1` or `192.168.x.x` only work on your own computer or your own Wi-Fi.

For friends kilometers away, publish the site to **GitHub Pages**. It is free and works like a normal website.

## Fastest free method

1. Go to [github.com](https://github.com) and sign in.
2. Create a new **public** repository.
   - Good repository name: `bioforge-biotechnology`
3. Upload all files from this project folder:
   - `src`
   - `.github`
   - `index.html`
   - `package.json`
   - `pnpm-lock.yaml`
   - `vite.config.js`
   - `tailwind.config.js`
   - `postcss.config.js`
   - `README.md`
4. Do **not** upload:
   - `node_modules`
   - `.pnpm-store`
   - `dist`
5. Open repository **Settings → Pages**.
6. In **Build and deployment**, select **GitHub Actions**.
7. Open the **Actions** tab and run **Deploy BioForge to GitHub Pages**.

## Your final public link

The link will look like this:

```text
https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPOSITORY-NAME/
```

Example:

```text
https://armaan.github.io/bioforge-biotechnology/
```

Share that link on WhatsApp. Anyone with internet can open it.

## If the website opens but looks unstyled

Wait 1–2 minutes and refresh. GitHub Pages can take a short time to finish serving the newest files.

## If GitHub Actions fails

Check that these files exist in the repository:

- `.github/workflows/deploy.yml`
- `package.json`
- `pnpm-lock.yaml`
- `vite.config.js`
- `src/App.jsx`

The project does not need a backend, database, paid API, or paid hosting.
