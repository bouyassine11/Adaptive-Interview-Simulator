import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export async function createUser(data: {
  name?: string;
  email: string;
  image?: string;
}) {
  const [user] = await db.insert(users).values(data).returning();
  return user;
}

export async function getUserByEmail(email: string) {
  return db.query.users.findFirst({
    where: eq(users.email, email),
  });
}

export async function getUser(id: string) {
  return db.query.users.findFirst({
    where: eq(users.id, id),
  });
}
