# SkillAdapt — Adaptive Interview Simulator

An interview prep tool that adapts to your skill level using IRT (Item Response Theory). Get LLM-graded answers, track per-concept mastery, and know exactly what to study next.

## Features

- **IRT-Based Adaptive Testing** — Questions adjust to your ability in real time using Item Response Theory (the same model behind the GRE and Duolingo).
- **LLM-Graded Answers** — Write natural language answers. An LLM evaluates them against a detailed rubric.
- **Per-Concept Mastery Map** — See exactly which topics you've mastered and which need work.
- **4 Domains** — Software Engineering, Data Engineering, Data Science, AI Engineering (40 questions).
- **Dashboard** — Radar chart mastery map, session history, ability trajectory, weak area detection.

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Database:** Postgres 17 (Neon) + Drizzle ORM
- **Auth:** NextAuth v5 (Google OAuth)
- **AI:** Hugging Face Inference API (Mistral-7B, Zephyr fallback)
- **UI:** shadcn (base-ui) + Tailwind CSS v4
- **Testing:** IRT engine (24 unit tests) + LLM pipeline (19 unit tests)

## Getting Started

### Prerequisites

- Node.js 18+
- Docker (for local Postgres) or a Neon account
- Google Cloud OAuth credentials
- Hugging Face API token (optional — grading degrades gracefully)

### Setup

```bash
# 1. Clone
git clone https://github.com/bouyassine11/Adaptive-Interview-Simulator.git
cd Adaptive-Interview-Simulator

# 2. Install
npm install

# 3. Copy env file
cp .env.example .env

# 4. Fill in .env
#    - AUTH_SECRET: run `npx auth secret`
#    - AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET: from Google Cloud Console
#    - DATABASE_URL: local Postgres or Neon connection string
#    - HF_API_TOKEN: from huggingface.co/settings/tokens (optional)

# 5. Start Postgres (if local)
docker compose up -d

# 6. Push schema
npm run db:push

# 7. Seed questions
npm run db:generate
npx tsx src/lib/db/seed.ts

# 8. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/  # Google OAuth
│   │   ├── session/             # Session CRUD + grading
│   │   ├── dashboard/           # Mastery + history
│   │   └── questions/           # Question listing
│   ├── interview/               # Interview session pages
│   ├── dashboard/               # Dashboard + history + concept pages
│   ├── error.tsx                # Error boundary
│   ├── not-found.tsx            # 404 page
│   └── global-error.tsx         # Root error boundary
├── components/
│   ├── ui/                      # shadcn components
│   ├── interview/               # Question, score, progress, end
│   ├── dashboard/               # Dashboard client
│   └── charts/                  # Radar + line charts
├── lib/
│   ├── irt/                     # IRT engine (model, ability, selection, concepts)
│   ├── llm/                     # LLM grading pipeline
│   ├── db/                      # Schema, queries, seed, questions
│   ├── api/                     # Auth helper, rate limiting, session state
│   ├── hooks/                   # Auto-save, keyboard shortcuts, timeout
│   └── auth.ts                  # NextAuth config
```

## API Routes

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/session/start` | Create a new interview session |
| `GET` | `/api/session/:id/next` | Get next adaptive question (IRT) |
| `POST` | `/api/session/:id/answer` | Submit answer → LLM grade → update theta |
| `GET` | `/api/session/:id/status` | Session state (theta, SE, step, concepts) |
| `GET` | `/api/dashboard/mastery` | Per-concept mastery data |
| `GET` | `/api/dashboard/history` | Past sessions + ability trajectory |
| `GET` | `/api/questions` | List questions (?category=&tags=) |

## Deployment

### Vercel

1. Push to GitHub
2. Import in Vercel
3. Set environment variables:
   - `DATABASE_URL` — Neon connection string (with `?sslmode=require`)
   - `AUTH_SECRET` — `npx auth secret`
   - `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET`
   - `HF_API_TOKEN` (optional)
4. Add build command: `npx drizzle-kit migrate && next build`
5. Deploy

### Database (Neon)

1. Create a Neon project
2. Copy the connection string to `DATABASE_URL`
3. Run: `npx drizzle-kit migrate` then `npx tsx src/lib/db/seed.ts`

## License

MIT
