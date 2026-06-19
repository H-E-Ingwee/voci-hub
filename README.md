# VOCI Hub 🎙️

**Voice of Change Initiative — Digital Member Platform**

> "Your voice is your power. Use it to inspire, lead, and change the world."

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
voci-hub/
├── src/
│   ├── pages/          # All page components
│   │   ├── Dashboard.jsx
│   │   ├── Profile.jsx
│   │   ├── Training.jsx
│   │   ├── Mentorship.jsx
│   │   ├── Community.jsx
│   │   ├── Spheres.jsx
│   │   ├── Sessions.jsx
│   │   ├── Impact.jsx
│   │   ├── Announcements.jsx
│   │   └── Progress.jsx
│   ├── components/     # Shared components
│   │   ├── Layout.jsx
│   │   ├── Sidebar.jsx
│   │   └── TopBar.jsx
│   ├── context/        # Global state
│   │   └── AppContext.jsx
│   ├── data/           # Mock data (replace with API in Phase 2)
│   │   └── mockData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── vercel.json         # Vercel deployment config
├── vite.config.js
└── package.json
```

---

## 🌐 Deploy to Vercel

### Option 1: Via GitHub (Recommended)
1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Vercel auto-detects Vite — click **Deploy**
5. Done! Your VOCI Hub is live.

### Option 2: Via Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## 🔧 Phase 2 — Backend Integration

Replace mock data in `src/data/mockData.js` with real API calls:

### Recommended Stack
| Layer | Technology |
|-------|-----------|
| Backend | Node.js + Express or Next.js API routes |
| Database | PostgreSQL via Supabase (free tier available) |
| Auth | Supabase Auth or NextAuth.js |
| Email | SendGrid |
| Real-time | Supabase Realtime or Pusher |
| File Storage | Supabase Storage |

### Environment Variables (create `.env.local`)
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=your_api_url
```

### API Endpoints to Build
```
GET    /api/members          — All members
GET    /api/members/:id      — Single member
PUT    /api/members/:id      — Update profile
GET    /api/sessions         — All sessions
GET    /api/pillars          — Pillar progress
POST   /api/wins             — Post a win
GET    /api/wins             — Community feed
GET    /api/announcements    — Announcements
POST   /api/mentorship       — Log session
GET    /api/impact-projects  — Impact projects
POST   /api/impact-projects  — Create project
```

---

## 🎨 Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| VOCI Red | `#BF0000` | Primary — headings, CTAs, borders |
| VOCI Gold | `#D4A017` | Secondary — accents, highlights |
| VOCI Blue | `#1E90FF` | Tertiary — links, data, digital |
| Charcoal | `#222222` | Body text |

---

## 📞 Contact

- **Email:** vociglobal@gmail.com
- **Website:** vociglobal.site
- **Instagram:** @VociGlobal

---

*Built with ❤️ for the Voice of Change Initiative — Murang'a, Kenya, 2026*