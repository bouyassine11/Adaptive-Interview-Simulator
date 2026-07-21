import type { Question } from "../../types";
import swe from "./swe";
import de from "./de";
import ds from "./ds";
import ai from "./ai";

export const allQuestions: Omit<Question, "id">[] = [...swe, ...de, ...ds, ...ai];

export const questionsByCategory = { swe, de, ds, ai } as const;
