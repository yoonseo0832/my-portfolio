import { createHash } from "crypto";
import { cookies } from "next/headers";
import { getSupabase } from "@/lib/supabase";
import { aboutMarkdown } from "@/components/about-markdown";
import { contactMarkdown } from "@/app/(site)/contact/page";
async function authorized() {
  const password = process.env.ADMIN_PASSWORD;
  const token = (await cookies()).get("admin_session")?.value;
  return Boolean(
    password && token === createHash("sha256").update(password).digest("hex"),
  );
}
export async function GET() {
  if (!(await authorized()))
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { data, error } = await getSupabase().from("site_content").select("*");
  if (error) return Response.json({ error: error.message }, { status: 500 });
  const saved = new Map((data ?? []).map((row) => [row.key, row.content]));
  return Response.json([
    { key: "about", content: saved.get("about") ?? aboutMarkdown },
    { key: "contact", content: saved.get("contact") ?? contactMarkdown },
  ]);
}
export async function PUT(request: Request) {
  if (!(await authorized()))
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { key, content } = await request.json();
  const { data, error } = await getSupabase()
    .from("site_content")
    .upsert({ key, content, updated_at: new Date().toISOString() })
    .select()
    .single();
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}
