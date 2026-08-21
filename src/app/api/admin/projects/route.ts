import { createHash } from "crypto";
import { cookies } from "next/headers";
import { getSupabase } from "@/lib/supabase";
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
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}
export async function POST(request: Request) {
  if (!(await authorized()))
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { data, error } = await getSupabase()
    .from("projects")
    .insert(await request.json())
    .select()
    .single();
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}
export async function PATCH(request: Request) {
  if (!(await authorized()))
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...values } = await request.json();
  const { data, error } = await getSupabase()
    .from("projects")
    .update(values)
    .eq("id", id)
    .select()
    .single();
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}
export async function DELETE(request: Request) {
  if (!(await authorized()))
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await request.json();
  const { error } = await getSupabase().from("projects").delete().eq("id", id);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}
