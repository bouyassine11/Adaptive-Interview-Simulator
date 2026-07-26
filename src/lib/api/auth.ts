const DEV_USER_ID = "dev-user-001";

export async function requireAuth() {
  return { userId: DEV_USER_ID, name: "Developer" };
}
