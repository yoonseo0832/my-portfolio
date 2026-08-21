import DevNoteEditor from "@/components/dev-note-editor";
export default async function EditDevNotePage({ params }: { params: Promise<{ slug: string }> }) { return <DevNoteEditor slug={(await params).slug} />; }
