import { getSupabase } from "@/lib/supabase";
import { createHash } from "crypto";
import { cookies } from "next/headers";

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
  const { data, error } = await getSupabase()
    .from("dev_notes")
    .select("id, slug, title, content, updated_at")
    .order("updated_at", { ascending: false });
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}
