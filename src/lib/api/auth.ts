import { auth } from "@/lib/auth";

type AuthResult = { userId: string; name?: string } | { error: Response };

export async function requireAuth(): Promise<AuthResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: new Response("Unauthorized", { status: 401 }) };
  }
  return { userId: session.user.id, name: session.user.name ?? undefined };
}
