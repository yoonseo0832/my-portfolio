"use client";
import Link from "next/link";
import { FileText, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
type Note = {
  id: string;
  slug: string;
  title: string;
  content: string;
  updated_at: string;
};
export default function DevNotes() {
  const { isAdmin } = useAuthStore();
  const [notes, setNotes] = useState<Note[]>([]);
  useEffect(() => {
    fetch("/api/dev-notes", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : []))
      .then(setNotes);
  }, []);
  return (
    <section className="projects-page dev-notes-page">
      <div className="projects-heading">
        <p className="eyebrow">/ workspace / notes</p>
        <h1>Dev Notes</h1>
        <p>현재 개발 중인 작업과 다음 계획을 정리한 Markdown 노트입니다.</p>
      </div>
      {isAdmin && (
        <Link className="dev-note-write button" href="/dev-notes/new">
          <Plus size={16} /> 작성하기
        </Link>
      )}
      <div className="dev-note-list">
        {notes.map((note) => (
          <Link
            className="dev-note-card"
            href={`/dev-notes/${note.slug}`}
            key={note.id}
          >
            <FileText size={20} />
            <div>
              <h2>{note.title}</h2>
              <p>
                {note.content
                  .replace(/[#*_`>-]/g, "")
                  .trim()
                  .slice(0, 120) || "내용 없음"}
              </p>
              <time>
                {new Date(note.updated_at).toLocaleDateString("ko-KR")}
              </time>
            </div>
          </Link>
        ))}
        {!notes.length && (
          <p className="dev-notes-empty">아직 작성된 노트가 없습니다.</p>
        )}
      </div>
    </section>
  );
}
