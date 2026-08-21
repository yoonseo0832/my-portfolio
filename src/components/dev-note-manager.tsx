"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
type Note = { id?: string; slug: string; title: string; content: string };
const blank: Note = { slug: "", title: "", content: "" };
export default function DevNoteManager() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [form, setForm] = useState(blank);
  const [message, setMessage] = useState("");
  async function load() {
    const r = await fetch("/api/admin/dev-notes", { cache: "no-store" });
    if (r.ok) setNotes(await r.json());
  }
  useEffect(() => {
    void load();
  }, []);
  async function save(e: React.FormEvent) {
    e.preventDefault();
    const r = await fetch("/api/admin/dev-notes", {
      method: form.id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setMessage(r.ok ? "saved" : "save failed");
    if (r.ok) {
      setForm(blank);
      await load();
    }
  }
  async function remove(id: string) {
    if (!confirm("이 노트를 삭제할까요?")) return;
    await fetch("/api/admin/dev-notes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await load();
  }
  return (
    <section className="cmd-panel">
      <div className="cmd-panel-title">
        [ DEV NOTES // MARKDOWN FILES ]{" "}
        <Link href="/dev-notes">[ 나가기 ]</Link>
      </div>
      <form className="cmd-form" onSubmit={save}>
        <input
          placeholder="file slug (예: roadmap-2026)"
          value={form.slug}
          onChange={(e) =>
            setForm({
              ...form,
              slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
            })
          }
          required
        />
        <input
          placeholder="note title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="# 오늘의 개발 노트\n\nMarkdown으로 작성하세요."
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        />
        <button>{form.id ? "UPDATE NOTE" : "ADD NOTE"}</button>
        {message && <span className="cmd-green">{message}</span>}
      </form>
      {notes.map((note) => (
        <div className="cmd-project" key={note.id}>
          <span className="cmd-green">[.md]</span>
          <strong>{note.title}</strong>
          <button onClick={() => setForm(note)}>EDIT</button>
          <button onClick={() => note.id && remove(note.id)}>DELETE</button>
        </div>
      ))}
    </section>
  );
}
