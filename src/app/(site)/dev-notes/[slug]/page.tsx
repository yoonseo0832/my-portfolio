import DevNoteDetail from "@/components/dev-note-detail";

export default async function DevNotePage({ params }: { params: Promise<{ slug: string }> }) {
  return <DevNoteDetail slug={(await params).slug} />;
}
