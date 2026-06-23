# BioForge — Biotechnology Visual Guide

BioForge is a premium-feeling, completely free interactive learning website for Class 12 Biology and NEET students studying **Biotechnology: Principles, Processes & Applications**.

It includes an animated hero, chapter roadmap, restriction-enzyme model, PCR cycle simulator and amplification calculator, interactive plasmid, gel-electrophoresis lab, 3D stirred-tank bioreactor, NEET high-yield revision, quizzes, flashcards, and original visual diagrams.

## Free and open-source stack

- React + Vite
- Tailwind CSS
- Three.js
- Mermaid.js
- Lucide icons
- Original SVG/CSS diagrams and browser-rendered 3D geometry
- Local JSON content; no backend, database, paid API, or subscription

## Run locally on your own computer

Requirements: Node.js 20 or newer.

```bash
pnpm install
pnpm run dev
```

Open the local address printed by Vite.

## Share on the same Wi-Fi

This is only for classmates connected to the same Wi-Fi network:

```bash
pnpm run dev:host
```

Then share the Network URL printed by Vite, for example:

```text
http://192.168.1.36:5173/
```

For friends in another city or outside your Wi-Fi, use GitHub Pages below.

## Build for production

```bash
pnpm run build
pnpm run preview
```

The optimized static site is created in `dist/`.

## Deploy free on GitHub Pages for a public internet link

This gives a normal link you can share on WhatsApp, such as:

```text
https://your-github-username.github.io/your-repository-name/
```

Steps:

1. Create a free GitHub account if you do not already have one.
2. Create a new public repository, for example `bioforge-biotechnology`.
3. Upload this project folder to the repository.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, choose **GitHub Actions**.
6. Open the **Actions** tab and run **Deploy BioForge to GitHub Pages**, or make any commit to `main`.

The included workflow automatically sets Vite's base path from the repository name, builds the site, and publishes it.

After deployment finishes, your public website link will be:

```text
https://your-github-username.github.io/repository-name/
```

Example: if your username is `armaan` and repository is `bioforge-biotechnology`, the link will be:

```text
https://armaan.github.io/bioforge-biotechnology/
```

## Project structure

```text
src/
  components/        Reusable visual, 3D, quiz, and revision components
  data/              Notes, quiz, glossary, diagrams, and flashcards JSON
  styles/            Tailwind layers and original visual system
  App.jsx            Single-page chapter experience
.github/workflows/   Free GitHub Pages deployment
```

## Add another biology chapter

1. Add chapter content as local JSON under `src/data/`.
2. Compose the chapter from reusable cards, diagrams, timelines, quizzes and 3D viewers in `src/components/`.
3. Add the section to `src/App.jsx` and navigation.
4. Keep diagrams original. Prefer SVG, CSS animation, Mermaid and generated Three.js geometry over copied textbook artwork.

## Credits and attribution

- Three.js — MIT License
- Mermaid — MIT License
- Lucide — ISC License
- React, Vite and Tailwind CSS — MIT License

No external 3D models, stock photos, or copied NCERT diagrams are used in this release. All chapter visuals are original browser-rendered schematics.

## Educational disclaimer

BioForge is an independent educational resource. It is NCERT-aligned for study support, but is not affiliated with NCERT, CBSE or NTA. Textbook concepts are explained in original language and diagrams are independently created rather than copied. Students should use the current official syllabus and textbook as their final examination reference.
