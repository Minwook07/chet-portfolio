# Okawasakii — Personal Portfolio

A personal developer portfolio built with **React 19**, **TypeScript**, and **Vite** — featuring dark mode, multilingual support, a Spotify music player, and lazy-loaded sections for optimal performance. Deployed on Vercel.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 6 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| i18n | i18next + react-i18next |
| Email | EmailJS |
| Analytics | Vercel Analytics + Speed Insights |
| Animation | AOS (Animate On Scroll) |
| Icons | react-icons (Tabler) |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── assets/               # Static asset references & techstack map
│   └── techstack/
├── components/
│   ├── section/          # Page sections (Navigation, About, Skills, Projects)
│   ├── DarkModeToggle.tsx
│   ├── Footer.tsx
│   └── MusicPlayer.tsx   # Floating Spotify embed player
├── config/
│   └── socialLinks.ts    # Centralized social link config
├── contexts/
│   └── DarkModeContext.tsx
├── pages/
│   └── Contact.tsx
├── styles/
│   └── colors.ts
├── App.tsx
├── main.tsx
└── vite-env.d.ts
```

---

## Getting Started

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Features

- **Dark / Light mode** — persisted via `localStorage`, toggled with a single button
- **Multilingual** — English and Khmer (ភាសាខ្មែរ) via i18next HTTP backend
- **Spotify music player** — floating widget with playlist, skip controls, and auto-advance
- **Lazy-loaded sections** — Skills, Projects, Contact, Footer, and MusicPlayer are code-split for fast initial load
- **Contact form** — powered by EmailJS with toast notifications
- **Performance** — Vercel Analytics and Speed Insights integrated
- **AOS animations** — scroll-triggered reveal animations

---

## Internationalization

Translation files live in `public/locales/`:

```
public/locales/
├── en/translation.json
└── km/translation.json
```

Add a new language by creating a new folder and registering the locale key in `Navigation.tsx`.

---

## License

This project is personal and not licensed for reuse. All content, images, and copy belong to Mith Chet.

---