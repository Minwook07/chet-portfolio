# Okawasakii — Personal Portfolio

A personal developer portfolio built with **Next.js (App Router)**, **React 19**, and **TypeScript** — featuring dark mode, multilingual support, a Spotify music player, and lazy-loaded sections for optimal performance. Deployed on Vercel.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| i18n | i18next + react-i18next (bundled JSON in `src/locales`) |
| Email | EmailJS |
| Analytics | Vercel Analytics + Speed Insights |
| Animation | AOS (Animate On Scroll) |
| Icons | react-icons (Tabler) |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout, metadata, fonts, analytics
│   ├── page.tsx          # Home page (About, Skills, Projects, Contact)
│   ├── providers.tsx     # Client providers: dark mode, accent color, AOS, i18n
│   ├── not-found.tsx     # 404 page
│   └── globals.css       # Tailwind 4 + theme CSS
├── components/
│   ├── section/          # Navigation, About, Skills, Projects, Contact
│   ├── ColorThemePicker.tsx
│   ├── DarkModeToggle.tsx
│   └── Footer.tsx
├── config/socialLinks.ts
├── contexts/             # DarkModeContext, ColorThemeContext
├── lib/                  # i18n setup, useLocalStorage (SSR-safe)
├── locales/              # en / km translation.json
└── styles/colors.ts
public/                   # images, pdf, robots.txt
```

---

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start    # http://localhost:3000
```

---

## Internationalization

Translations live in `src/locales/<lang>/translation.json` and are bundled
(no HTTP fetch). To add a language: add the JSON, register it in
`src/lib/i18n.ts`, and add it to `languages` in `Navigation.tsx`.

---

## License

This project is personal and not licensed for reuse. All content, images, and copy belong to Mith Chet.
