# 🎯 FitScore — AI Resume Analyser

> Paste any job description. Upload your resume. Get your match score, missing keywords, section ratings, and AI-rewritten bullet points — in 10 seconds.

<img width="1920" height="1080" alt="Screenshot from 2026-03-30 17-07-06" src="https://github.com/user-attachments/assets/f1ce5a11-8c48-43a4-9489-92c761895da9" />



---

## 📸 Preview

> _Add a screenshot here after deployment — drag a screenshot into the GitHub editor_

---

## ✨ What It Does

Most candidates apply to jobs without knowing how well their resume actually matches. Recruiters spend 7 seconds on a resume. ATS systems reject 75% of applications before a human ever sees them.

**FitScore fixes that.**

Paste a job description. Upload your resume as a PDF or plain text. FitScore sends both to Claude AI and returns:

- **Match score** — an overall 0–100 percentage with animated score circle
- **Sub-scores** — keywords, experience, skills, and format rated individually
- **Missing keywords** — exact words from the JD that your resume lacks
- **Found keywords** — what you already have working in your favour
- **Section ratings** — Summary, Experience, Skills, and Education each rated out of 10 with one-line feedback
- **AI rewrite suggestions** — 3 of your actual bullet points rewritten to better match the role
- **Strengths highlight** — what your resume already does well for this specific role
- **Top recommendation** — the single most impactful action to improve your application

---

## 🚀 Live Demo

**Try it now → [fitscore-ten.vercel.app](https://fitscore-ten.vercel.app)**

No sign-up. No account. Completely free to use.

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | React 18 + Vite | Fast dev, component architecture |
| Styling | Tailwind CSS | Rapid, consistent UI |
| Animations | Framer Motion | Smooth score circle and staggered reveals |
| PDF Extraction | pdf.js (Mozilla) | Client-side PDF parsing, no backend upload |
| AI Engine | Claude Sonnet (Anthropic) | Best structured JSON output, 200k context |
| API Proxy | Vercel Serverless Functions | Hides API key, zero cold-start issues |
| Storage | localStorage | History without a database |
| Deployment | Vercel | Free hosting, instant deploys from GitHub |

---

## 🧠 How It Works

```
User inputs JD + Resume
        │
        ▼
ResumeUpload.jsx ──► pdf.js extracts text client-side
        │
        ▼
POST /api/analyse (Vercel serverless)
        │
        ▼
Claude Sonnet API ──► Engineered prompt returns structured JSON
        │
        ▼
React components render animated results
        │
        ▼
localStorage saves history (last 5 analyses)
```

The key architectural decision is the **Vercel serverless proxy**. The Claude API key never touches the browser — all requests go through `api/analyse.js` which runs server-side. This is how production apps handle third-party API secrets.

---

## 📁 Project Structure

```
fitscore/
├── api/
│   └── analyse.js          # Vercel serverless — Claude API proxy
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── TwoPanel.jsx
│   │   │   └── HistoryPanel.jsx
│   │   ├── input/
│   │   │   ├── JobDescInput.jsx
│   │   │   ├── ResumeUpload.jsx
│   │   │   └── AnalyseButton.jsx
│   │   └── results/
│   │       ├── ScoreCircle.jsx
│   │       ├── ScoreBreakdown.jsx
│   │       ├── KeywordPills.jsx
│   │       ├── SectionRatings.jsx
│   │       ├── RewriteSuggestions.jsx
│   │       ├── StrengthsList.jsx
│   │       └── ResultsSkeleton.jsx
│   ├── hooks/
│   │   ├── useAnalysis.js
│   │   ├── usePdfExtract.js
│   │   └── useHistory.js
│   ├── utils/
│   │   ├── storage.js
│   │   └── validators.js
│   └── App.jsx
├── .env.local              # Never commit — see setup
├── vercel.json
└── package.json
```

---

## ⚙️ Run Locally

### Prerequisites
- Node.js 18+
- An Anthropic API key → [console.anthropic.com](https://console.anthropic.com)
- Vercel CLI (for local serverless functions)

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/fastcode746/Fitscore-Resume-Checker.git
cd fitscore

# 2. Install dependencies
npm install

# 3. Install Vercel CLI globally
npm install -g vercel

# 4. Create your environment file
cp .env.example .env.local
# Then open .env.local and add your Anthropic API key

# 5. Run the app (Vercel CLI handles both frontend + serverless)
vercel dev
```

Open `http://localhost:3000` in your browser.

### Environment Variables

Create `.env.local` in the project root:

```env
ANTHROPIC_API_KEY=sk-ant-your-key-here
VITE_API_URL=http://localhost:3000/api/analyse
```

> ⚠️ Never commit `.env.local` — it is in `.gitignore` by default.

---

## 🚢 Deploy to Vercel

```bash
# 1. Push your code to GitHub (without .env.local)
git add .
git commit -m "Initial commit"
git push origin main

# 2. Go to vercel.com → New Project → Import your GitHub repo
# 3. In Vercel dashboard → Settings → Environment Variables
#    Add: ANTHROPIC_API_KEY = your key
#    Add: VITE_API_URL = /api/analyse
# 4. Deploy — live in ~60 seconds
```

---

## 💡 Key Design Decisions

**Why Claude over GPT-4?**
Claude Sonnet has a 200k token context window which means it can handle very long resumes and job descriptions without truncation. It also follows structured JSON output instructions more reliably, which matters when you need to parse the response and render it as UI components.

**Why pdf.js client-side instead of a backend upload?**
Uploading resumes to a server introduces privacy concerns and storage costs. By extracting text in the browser using pdf.js, the actual resume file never leaves the user's device. Only the extracted text is sent to the API.

**Why Vercel serverless for the API proxy?**
Calling Claude directly from the React frontend would expose the API key in the browser — anyone could open DevTools and steal it. The serverless function runs on Vercel's servers, keeps the key hidden, and adds a layer for rate limiting and error handling.

**Why localStorage for history?**
A database would require authentication, a backend, and ongoing infrastructure costs. localStorage gives users a history of their last 5 analyses with zero friction, zero sign-up, and zero cost. It resets when they clear their browser, which is an acceptable tradeoff for a portfolio project.

---

## 🔮 Planned Features

- [ ] Cover letter generator based on JD + resume match
- [ ] ATS compatibility checker (tables, columns, fonts)
- [ ] Export analysis report as PDF
- [ ] Multiple resume versions comparison
- [ ] Job board URL import (paste a LinkedIn job URL)
- [ ] Saved resume profiles

---

## 👤 Built By

**Zargham Abbas (Victor)**
Full Stack Developer — Laravel · React · Flutter · Node.js

- 🔗 Portfolio: [ZarghamAbbas.com](https://zarghamabbas-portfolio.vercel.app)
- 💼 LinkedIn: [linkedin.com/in/zargham-abbas-dev](https://www.linkedin.com/in/zargham-abbas-dev/)
- 🐙 GitHub: [github.com/fastcode746](https://github.com/fastcode746)
- ☕ Support on Patreon: [patreon.com/c/zarghamabbas](https://www.patreon.com/cw/ZarghamAbbas)

---

## ☕ Support This Project

If FitScore helped you land interviews, consider supporting future development on Patreon. Your support helps me keep building free tools for developers.

**[Support on Patreon →](https://www.patreon.com/cw/ZarghamAbbas)**

---

## 📄 License

MIT — free to use, fork, and build on. Attribution appreciated but not required.

---

_Built in 10 days as a portfolio project. Powered by Claude AI._
