# 🎓 CGPA Calculator

A clean, no-auth CGPA calculator built with React + Vite.

## Features
- Add subjects with name, credits, grade, and semester
- Auto-calculated CGPA and per-semester SGPA
- Previous CGPA + Previous Credits → Final CGPA
- Dark glassmorphism UI

---

## Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
```

Open http://localhost:5173

---

## Deploy to Vercel

### Option A — Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option B — GitHub + Vercel Dashboard
1. Push this folder to a GitHub repo
2. Go to https://vercel.com → New Project → Import repo
3. Vercel auto-detects Vite:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Click Deploy ✅

Every `git push` triggers an auto-redeploy.

---

## Project Structure

```
src/
├── main.jsx                  # React entry point
├── App.jsx                   # Root component (state + layout)
├── index.css                 # Global dark theme styles
├── components/
│   ├── Navbar.jsx            # Sticky top bar
│   ├── CGPACard.jsx          # Stats + Previous/Final CGPA
│   ├── SubjectForm.jsx       # Add/Edit form
│   ├── SubjectTable.jsx      # Semester-grouped table
│   └── Toast.jsx             # Notifications
├── hooks/
│   └── useToast.js           # Toast state hook
└── utils/
    ├── constants.js           # Grades, grade points, colours
    └── calculations.js        # CGPA/SGPA math helpers
```
