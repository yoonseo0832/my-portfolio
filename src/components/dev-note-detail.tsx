"use client";
import Link from "next/link";
import { ArrowLeft, Pencil, Trash2, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
type Note = {
  id: string;
  slug: string;
  title: string;
  content: string;
  updated_at: string;
};

export default function DevNoteDetail({ slug }: { slug: string }) {
  const router = useRouter();
  const { isAdmin } = useAuthStore();
  const [note, setNote] = useState<Note | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    fetch("/api/dev-notes", { cache: "no-store" })
      .then((r) => r.json())
      .then((rows) => setNote(rows.find((x: Note) => x.slug === slug) ?? null));
  }, [slug]);
  async function remove() {
    if (!note) return;
    setDeleting(true);
    const response = await fetch("/api/admin/dev-notes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: note.id }),
    });
    if (response.ok) router.push("/dev-notes");
    else setDeleting(false);
  }
  if (!note)
    return (
      <section className="projects-page dev-note-detail">
        <Link href="/dev-notes">
          <ArrowLeft size={16} /> 목록으로
        </Link>
        <p>노트를 찾을 수 없습니다.</p>
      </section>
    );
  return (
    <>
      <article className="projects-page dev-note-detail">
        <div className="dev-note-toolbar">
          <Link href="/dev-notes">
            <ArrowLeft size={16} /> Dev Notes
          </Link>
          {isAdmin && (
            <div>
              <Link href={`/dev-notes/${note.slug}/edit`}>
                <Pencil size={15} /> 수정
              </Link>
              <button onClick={() => setDeleteOpen(true)}>
                <Trash2 size={15} /> 삭제
              </button>
            </div>
          )}
        </div>
        <p className="eyebrow">
          UPDATED {new Date(note.updated_at).toLocaleDateString("ko-KR")}
        </p>
        <h1>{note.title}</h1>
        <div className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {note.content}
          </ReactMarkdown>
        </div>
      </article>
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="delete-dialog">
          <DialogHeader>
            <div className="delete-dialog-icon">
              <AlertTriangle size={22} />
            </div>
            <DialogTitle>노트를 삭제할까요?</DialogTitle>
            <DialogDescription>
              <strong>{note.title}</strong> 노트를 삭제하면 다시 복구할 수
              없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="delete-dialog-actions">
            <Button
              variant="outline"
              onClick={() => setDeleteOpen(false)}
              disabled={deleting}
            >
              취소
            </Button>
            <Button variant="destructive" onClick={remove} disabled={deleting}>
              {deleting ? "삭제 중..." : "삭제"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
