# ◈ Portfolio Website

A modern, component-based React portfolio with a dark editorial aesthetic — sharp typography, animated skill bars, typewriter effects, and a polished contact page with scheduling CTA.

---

## Project Structure

```
portfolio/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx                  # React root
    ├── App.jsx                   # Router + layout shell
    ├── styles/
    │   └── globals.css           # Design tokens, typography, utilities
    ├── components/
    │   ├── Header.jsx            # Fixed nav with mobile drawer
    │   ├── Header.css
    │   ├── Footer.jsx            # Footer with links, socials, availability
    │   └── Footer.css
    └── pages/
        ├── HomePage.jsx          # Hero, stats, projects, CTA
        ├── HomePage.css
        ├── AboutPage.jsx         # Bio, values, timeline
        ├── AboutPage.css
        ├── SkillsPage.jsx        # Tabbed skill bars, tech grid, services
        ├── SkillsPage.css
        ├── ContactPage.jsx       # Contact form + schedule CTA + FAQ
        └── ContactPage.css
```

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start MongoDB locally, or set MONGO_URI in .env

# 3. Start API server
npm run server

# 4. Start React dev server in another terminal
npm run dev

# 5. Build for production
npm run build
```

Copy `.env.example` to `.env` and update `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `JWT_SECRET`, and optional SMTP settings. If SMTP is not configured, admin OTP codes are printed in the API server console.

Signup/login require both services to be running:

```bash
# Terminal 1: MongoDB must be installed and running on this port
mongod --dbpath C:\data\db

# Terminal 2: Express API
npm run server

# Terminal 3: React app
npm run dev
```

MongoDB Compass is only a database GUI. It does not start the MongoDB server by itself.

### Using MongoDB Atlas

You can skip local MongoDB and Compass completely by setting `MONGO_URI` in `.env`:

```env
MONGO_URI=mongodb+srv://YOUR_DB_USER:YOUR_DB_PASSWORD@YOUR_CLUSTER.mongodb.net/portfolio_admin?retryWrites=true&w=majority
```

If `npm run server` shows `bad auth : authentication failed`, Node reached Atlas successfully, but the database username/password is wrong or not URL-encoded. Reset the password in Atlas Database Access, paste the fresh URI into `.env`, then run `npm run server` again.

---

## Admin + API

This project now includes an Express/MongoDB backend in `server/`:

| Feature              | Location                           |
|----------------------|------------------------------------|
| Admin Panel UI       | `AdminPage.jsx`                    |
| Login / Signup UI    | `AuthPage.jsx`                     |
| OTP-based 2FA        | `server/routes/auth.js`            |
| Database connection  | `server/config/db.js`              |
| CRUD API routes      | `server/routes/admin.js`           |
| Auth middleware      | `server/middleware/auth.js`        |

The admin can create, update, and delete projects, skill categories, services, and timeline items. Those records are read by the public React pages from `/api/portfolio`, so saved changes persist in MongoDB and become visible on the frontend.

---

## Customisation Checklist

- [ ] Replace **"Your Name"** in `HomePage.jsx` and `AboutPage.jsx`
- [ ] Update contact email in `ContactPage.jsx` and `Footer.jsx`
- [ ] Replace project placeholders in `HomePage.jsx`
- [ ] Add real profile photo in `AboutPage.jsx` (`bio-avatar__frame`)
- [ ] Update social links in `Footer.jsx` and `ContactPage.jsx`
- [ ] Add your real resume PDF at `public/resume.pdf`
- [ ] Update timeline / experience in `AboutPage.jsx`

---

## Design System

| Token            | Value                   |
|------------------|-------------------------|
| Background       | `#0a0a08`               |
| Accent (Gold)    | `#c9a84c`               |
| Display Font     | Playfair Display        |
| Mono Font        | DM Mono                 |
| Body Font        | Instrument Sans         |

---

Built with React + Vite. No external UI libraries — 100% custom CSS with CSS variables.
