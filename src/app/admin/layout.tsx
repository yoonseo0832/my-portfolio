import AdminContentManager from "@/components/admin-content-manager";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-console-shell">
      {children}
      <AdminContentManager />
    </div>
  );
}
