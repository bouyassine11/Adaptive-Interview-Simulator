# Adaptive Interview Simulator — Tasks

> From zero to fully working interview prep tool with IRT adaptation, LLM grading, and per-concept mastery maps.

---

## Phase 0: Project Foundation

- [x] **0.1** Initialize Next.js project with TypeScript + Tailwind + shadcn + landing page
- [x] **0.2** Set up project structure (lib/, components/, app/ layout)
- [x] **0.3** Configure ESLint + Prettier
- [x] **0.4** Add Docker Compose (Postgres)
- [x] **0.5** Set up Drizzle ORM + schema + config
- [x] **0.6** Add NextAuth v5 with Google OAuth
- [x] **0.7** Create `.env.example`
- [x] **0.8** Vercel config + Neon ready

---

## Phase 1: Database Schema + Storage

- [ ] **1.1** Write Drizzle schema: `users` table
- [ ] **1.2** Write Drizzle schema: `questions` table (stem, difficulty a/b/c, concept_tags, rubric JSON, topic_category)
- [ ] **1.3** Write Drizzle schema: `answer_sessions` table (user_id, started_at, ended_at, ability_trajectory JSON[])
- [ ] **1.4** Write Drizzle schema: `answers` table (session_id, question_id, user_text, llm_grade, llm_reasoning, score_continuous)
- [ ] **1.5** Write Drizzle schema: `concept_mastery` table (user_id, concept_tag, theta, variance, updated_at)
- [ ] **1.6** Run first migration + seed empty data
- [ ] **1.7** Write utility functions (db queries for sessions, answers, mastery)

---

## Phase 2: IRT Engine

- [ ] **2.1** Implement `model.ts` — 3PL: `P(theta) = c + (1-c)/(1+e^(-a(theta-b)))`
- [ ] **2.2** Implement `ability.ts` — EAP estimator (update ability after each answer)
- [ ] **2.3** Implement `selection.ts` — next question selector (maximize Fisher Information at current theta)
- [ ] **2.4** Implement `concepts.ts` — per-concept Bayesian mastery update
- [ ] **2.5** Implement `calibration.ts` — bootstrap difficulty heuristics from question complexity
- [ ] **2.6** Write unit tests for all IRT functions (known toy cases)
- [ ] **2.7** Create session state machine (start → select → grade → update → repeat/end)

---

## Phase 3: LLM Grading Pipeline

- [ ] **3.1** Create HF Inference API client (post request, handle rate limits, retry logic)
- [ ] **3.2** Build grading prompt template (question + rubric + user answer → structured JSON score)
- [ ] **3.3** Parse LLM response into structured grade (score, reasoning, missing points)
- [ ] **3.4** Add fallback model or graceful degradation if HF API is down
- [ ] **3.5** Write scoring normalization (map LLM output to continuous [0,1] score)
- [ ] **3.6** Add logging/tracking for LLM grading (latency, token usage, failures)

---

## Phase 4: Question Bank (Content)

- [ ] **4.1** Design question template + rubric format
- [ ] **4.2** Write **10 questions — Software Engineering** (system design, OOP, DS&A, testing, APIs, DBs, security, CI/CD)
- [ ] **4.3** Write **10 questions — Data Engineering** (ETL, Spark, Airflow, data warehouses, streaming, data modeling)
- [ ] **4.4** Write **10 questions — Data Science** (stats, ML algorithms, A/B testing, feature engineering, bias/variance, metrics)
- [ ] **4.5** Write **10 questions — AI Engineering** (LLMs, RAG, prompt engineering, vector DBs, fine-tuning, agents, eval)
- [ ] **4.6** Calibrate initial difficulty params (bootstrap from heuristics)
- [ ] **4.7** Create seed script to populate database with all questions

---

## Phase 5: API Routes

- [ ] **5.1** `POST /api/auth/*` — NextAuth endpoints
- [ ] **5.2** `POST /api/session/start` — create new interview session
- [ ] **5.3** `GET /api/session/:id/next` — get next question (IRT selects it)
- [ ] **5.4** `POST /api/session/:id/answer` — submit answer, call LLM, update theta
- [ ] **5.5** `GET /api/session/:id/status` — session progress (question #, current theta, SE)
- [ ] **5.6** `GET /api/dashboard/mastery` — per-concept mastery data
- [ ] **5.7** `GET /api/dashboard/history` — past sessions + ability trajectory
- [ ] **5.8** `GET /api/questions` — list questions with filters (admin/dev tool)

---

## Phase 6: Frontend — Interview Session

- [ ] **6.1** Landing page — hero, Start Interview button, view history link
- [ ] **6.2** Interview session page layout — question card, typing area, submit button
- [ ] **6.3** Question display component (stem + metadata like difficulty indicator)
- [ ] **6.4** Typing area with character count + submit on Cmd+Enter
- [ ] **6.5** Loading/skeleton state while LLM grades
- [ ] **6.6** Score display after grading (animated reveal, reasoning summary)
- [ ] **6.7** "Next Question" button after score shown
- [ ] **6.8** Session end screen — summary (questions answered, final ability, top weak areas)
- [ ] **6.9** Progress indicator (question X of Y, ability meter during session)
- [ ] **6.10** Error state + retry if LLM grading fails mid-session

---

## Phase 7: Frontend — Dashboard + Mastery Map

- [ ] **7.1** Dashboard layout — mastery overview, recent sessions, weak areas
- [ ] **7.2** Radar chart component for mastery map (recharts or custom SVG)
- [ ] **7.3** Per-concept deep-dive page (tag, theta over time, answered questions)
- [ ] **7.4** History page — past sessions list + ability trajectory line chart
- [ ] **7.5** Empty states (no sessions yet, no data for a concept)
- [ ] **7.6** Responsive design (works on mobile for quick practice)

---

## Phase 8: Integration + Polish

- [ ] **8.1** Wire frontend to all API routes
- [ ] **8.2** Add loading skeletons to all pages
- [ ] **8.3** Toast notifications (answer submitted, error, session saved)
- [ ] **8.4** Keyboard shortcuts (Cmd+Enter to submit, Ctrl+N for next)
- [ ] **8.5** Auto-save draft answers to localStorage (survive accidental refresh)
- [ ] **8.6** Session timeout handling (idle detection, warn before losing progress)
- [ ] **8.7** Rate limiting (both HF API calls and user requests)

---

## Phase 9: Deployment + Production Readiness

- [ ] **9.1** Configure Vercel project (environment variables, build settings)
- [ ] **9.2** Set up Neon database (production branch, connection pooling)
- [ ] **9.3** Run migrations against production DB
- [ ] **9.4** Seed production DB with questions
- [ ] **9.5** Add proper error boundaries + 404/500 pages
- [ ] **9.6** Add analytics (posthog or similar, opt-in)
- [ ] **9.7** Lighthouse audit — optimize for performance
- [ ] **9.8** Security audit (input sanitization, API auth checks, CORS)
- [ ] **9.9** Custom domain (optional)
- [ ] **9.10** Write README with setup instructions

---

## Phase 10: Post-MVP Enhancements

- [ ] **10.1** Voice answer support (Web Speech API → transcript → LLM grade)
- [ ] **10.2** Multi-model grading (compare 2+ LLMs, average scores)
- [ ] **10.3** Peer answer review (see how others answered the same question)
- [ ] **10.4** Question bank editor (admin UI to add/edit questions + rubrics)
- [ ] **10.5** Spaced repetition (surface weak concepts at optimal intervals)
- [ ] **10.6** Interview mode selection (timed mock interview vs untimed practice)
- [ ] **10.7** Export mastery report (PDF summary for real interview prep)
- [ ] **10.8** Social login expansion (LinkedIn, GitHub, email magic link)
- [ ] **10.9** Progressive Web App (offline access to past results)
- [ ] **10.10** Question bank crowdsourcing (user-submitted questions with review)

---

## Milestones

| Milestone | Tasks | What Works |
|---|---|---|
| **MVP-1** | 0.1–0.8, 1.1–1.7, 2.1–2.7, 3.1–3.6 | IRT engine works, database stores everything |
| **MVP-2** | 4.1–4.7, 5.1–5.8 | Full API with 40 questions, LLM grading works |
| **MVP-3** | 6.1–6.10, 7.1–7.6 | User can do a full interview + see mastery map |
| **MVP-4** | 8.1–8.7, 9.1–9.10 | Production-ready, deployed on Vercel |
| **v2** | 10.1–10.10 | Voice, spaced repetition, community features |
