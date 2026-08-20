import { createHash } from "crypto";
import { cookies } from "next/headers";
export async function POST(request: Request) { const { password } = await request.json(); if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) return Response.json({ error: "Invalid password" }, { status: 401 }); const token = createHash("sha256").update(password).digest("hex"); (await cookies()).set("admin_session", token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 8 }); return Response.json({ ok: true }); }
