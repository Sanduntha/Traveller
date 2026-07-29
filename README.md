# 🌍 Traveller

> Discover breathtaking destinations around the world — a modern travel showcase web app built with Next.js.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![Deploy](https://img.shields.io/badge/deploy-Vercel-black?style=flat-square&logo=vercel)

---

## ✨ Features

- 🗺️ **Explore Destinations** — Browse curated travel locations from around the globe
- 🏙️ **Province & Bento Grid Views** — Visually rich destination grids by region
- 🔍 **Destinations Showcase** — Highlighted travel spots with rich media
- 🧭 **Itinerary Morph** — Dynamic itinerary planning and visualization
- 🗾 **Interactive Map** — Explore locations via an integrated map client
- 🌀 **Vortex Hero** — Immersive animated hero section
- ⚡ **Command Dock** — Quick-access navigation dock
- 📱 **Fully Responsive** — Seamless experience across mobile, tablet, and desktop

---

## 🛠 Tech Stack

| Layer        | Technology                                                    |
|--------------|---------------------------------------------------------------|
| Framework    | [Next.js 15](https://nextjs.org) (App Router)                 |
| Language     | TypeScript                                                    |
| Styling      | CSS Modules + Global CSS                                      |
| Font         | [Geist](https://vercel.com/font) via `next/font`              |
| Image Data   | Unsplash API                                                  |
| Map          | Custom `MapClient` integration                                |
| Deployment   | [Vercel](https://vercel.com)                                  |

---

## 📦 Prerequisites

Ensure you have the following installed before getting started:

- [Node.js](https://nodejs.org/) `>= 18.x`
- A package manager: [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/), or [bun](https://bun.sh/)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/traveller.git
cd traveller
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in the required values in `.env.local` (see [Environment Variables](#-environment-variables) below).

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the app.

---

## 🔐 Environment Variables

Create a `.env.local` file at the root of the project:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Unsplash API (for destination images)
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here

# Maps Integration
NEXT_PUBLIC_MAPS_API_KEY=your_maps_api_key_here
```

> ⚠️ Never commit `.env.local` to version control — it's already listed in `.gitignore`.

---

## 📁 Project Structure

```
traveller/
├── public/                         # Static assets (images, icons, fonts)
├── src/
│   ├── app/
│   │   ├── favicon.ico             # App favicon
│   │   ├── globals.css             # Global styles
│   │   ├── layout.tsx              # Root layout (font, metadata, providers)
│   │   ├── page.module.css         # Home page styles
│   │   └── page.tsx                # Home / landing page
│   └── components/
│       ├── BentoDiscoveryGrid.tsx  # Bento-style destination grid
│       ├── CommandDock.tsx         # Quick-access navigation dock
│       ├── DestinationsShowcase.tsx# Featured destinations section
│       ├── ItineraryMorph.tsx      # Dynamic itinerary visualizer
│       ├── MapClient.tsx           # Interactive map component
│       ├── Providers.tsx           # App-level context providers
│       ├── ProvinceBentoGrid.tsx   # Province-based bento grid layout
│       ├── ProvincialExplorer.tsx  # Region / province explorer
│       └── VortexHero.tsx          # Animated hero section
├── check_ids.js                    # Utility: validate location IDs
├── check_images.js                 # Utility: validate image availability
├── finalize_explorer.js            # Utility: finalize explorer data
├── fix_images.js                   # Utility: fix/update image references
├── generate_places.js              # Utility: generate places data
├── expanded_places.json            # Expanded destination data
├── unsplash_data.json              # Cached Unsplash image metadata
├── next.config.ts                  # Next.js configuration
├── tsconfig.json                   # TypeScript configuration
├── eslint.config.mjs               # ESLint configuration
└── package.json                    # Project dependencies & scripts
```

---

## 📜 Available Scripts

| Command                     | Description                                      |
|-----------------------------|--------------------------------------------------|
| `npm run dev`               | Start the development server                     |
| `npm run build`             | Build the app for production                     |
| `npm run start`             | Run the production build locally                 |
| `npm run lint`              | Run ESLint checks                                |
| `node generate_places.js`   | Generate / refresh destination place data        |
| `node check_images.js`      | Validate image references in data                |
| `node fix_images.js`        | Fix broken or missing image links                |
| `node check_ids.js`         | Validate location IDs in the dataset             |
| `node finalize_explorer.js` | Finalize and clean up explorer data              |

---

## 🚢 Deployment

Deploy instantly with **[Vercel](https://vercel.com/new)** — zero config required for Next.js projects.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import the repo on Vercel
3. Add your environment variables in the Vercel dashboard
4. Click **Deploy** 🎉

For other hosting options, see the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).

---

## 🤝 Contributing

We'd love your help making Traveller even better! Here's how:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/add-destination-map`
3. **Commit** your changes: `git commit -m 'feat: add interactive destination map'`
4. **Push** to your branch: `git push origin feature/add-destination-map`
5. **Open a Pull Request** and describe your changes

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages and ensure `npm run lint` passes before submitting.

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

<p align="center">🌏 Built for wanderers, by wanderers — powered by <a href="https://nextjs.org">Next.js</a></p>
