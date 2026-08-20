import { createHash } from "crypto";
import { cookies } from "next/headers";
export async function GET() { const password = process.env.ADMIN_PASSWORD; const token = (await cookies()).get("admin_session")?.value; return Response.json({ authenticated: Boolean(password && token === createHash("sha256").update(password).digest("hex")) }); }
