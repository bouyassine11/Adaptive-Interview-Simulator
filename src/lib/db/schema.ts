import {
  pgTable,
  text,
  timestamp,
  uuid,
  jsonb,
  real,
  integer,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  email: text("email").unique().notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const questions = pgTable("questions", {
  id: uuid("id").defaultRandom().primaryKey(),
  stem: text("stem").notNull(),
  difficultyA: real("difficulty_a").notNull().default(1),
  difficultyB: real("difficulty_b").notNull().default(0),
  difficultyC: real("difficulty_c").notNull().default(0),
  conceptTags: text("concept_tags").array().notNull().default([]),
  topicCategory: text("topic_category").notNull(),
  rubric: jsonb("rubric").notNull(),
  source: text("source"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const answerSessions = pgTable("answer_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  endedAt: timestamp("ended_at"),
  abilityTrajectory: jsonb("ability_trajectory")
    .notNull()
    .default([])
    .$type<{ theta: number; se: number; step: number }[]>(),
});

export const answers = pgTable("answers", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionId: uuid("session_id")
    .notNull()
    .references(() => answerSessions.id, { onDelete: "cascade" }),
  questionId: uuid("question_id")
    .notNull()
    .references(() => questions.id),
  userText: text("user_text").notNull(),
  llmGrade: real("llm_grade"),
  llmReasoning: text("llm_reasoning"),
  scoreContinuous: real("score_continuous"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const conceptMastery = pgTable("concept_mastery", {
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  conceptTag: text("concept_tag").notNull(),
  theta: real("theta").notNull().default(0),
  variance: real("variance").notNull().default(1),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
