import { relations } from "drizzle-orm";
import {
  users,
  questions,
  answerSessions,
  answers,
  conceptMastery,
} from "./schema";

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(answerSessions),
  mastery: many(conceptMastery),
}));

export const answerSessionsRelations = relations(
  answerSessions,
  ({ one, many }) => ({
    user: one(users, {
      fields: [answerSessions.userId],
      references: [users.id],
    }),
    answers: many(answers),
  }),
);

export const answersRelations = relations(answers, ({ one }) => ({
  session: one(answerSessions, {
    fields: [answers.sessionId],
    references: [answerSessions.id],
  }),
  question: one(questions, {
    fields: [answers.questionId],
    references: [questions.id],
  }),
}));

export const conceptMasteryRelations = relations(conceptMastery, ({ one }) => ({
  user: one(users, {
    fields: [conceptMastery.userId],
    references: [users.id],
  }),
}));
