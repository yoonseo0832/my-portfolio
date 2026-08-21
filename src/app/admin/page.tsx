"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
type Project = {
  id?: string;
  title: string;
  description: string;
  tags: string[];
  repo_url: string;
  demo_url: string;
  markdown_content: string;
  is_visible: boolean;
  platform: string;
  platform_label: string;
};
const empty: Project = {
  title: "",
  description: "",
  tags: [],
  repo_url: "",
  demo_url: "",
  markdown_content: "",
  is_visible: true,
  platform: "github",
  platform_label: "GitHub",
};
const options = [
  ["github", "GitHub"],
  ["notion", "Notion"],
  ["instagram", "Instagram"],
  ["youtube", "YouTube"],
  ["canva", "Canva"],
  ["custom", "직접 입력"],
];
export default function Admin() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<Project>(empty);
  const [message, setMessage] = useState("Loading...");
  async function load() {
    const r = await fetch("/api/admin/projects", { cache: "no-store" });
    if (r.status === 401) return router.replace("/");
    if (!r.ok) return setMessage("Load failed");
    setProjects(await r.json());
    setMessage("");
  }
  useEffect(() => {
    void load();
  }, []);
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/");
  }
  async function save(e: React.FormEvent) {
    e.preventDefault();
    const r = await fetch("/api/admin/projects", {
      method: form.id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!r.ok) return setMessage("ERROR: save failed");
    setForm(empty);
    await load();
  }
  async function remove(id: string) {
    await fetch("/api/admin/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await load();
  }
  return (
    <main className="cmd-window">
      <header className="cmd-titlebar">
        <span>▣ C:\\Windows\\System32\\cmd.exe - admin@yoonseo-portfolio</span>
        <div className="cmd-title-actions">
          <Link href="/dev-notes">[ Back ]</Link>
          <button onClick={logout}>[ Logout ]</button>
        </div>
      </header>
      <div className="cmd-body">
        <p>Microsoft Windows [Version 10.0.22631.3007]</p>
        <p>(c) Yoonseo Corp. All rights reserved.</p>
        <p className="cmd-green">ADMIN SESSION ACTIVE</p>
        {message && <p className="cmd-error">{message}</p>}
        <section className="cmd-panel">
          <div className="cmd-panel-title">[ PROJECT MANAGER ]</div>
          <form className="cmd-form" onSubmit={save}>
            <input
              placeholder="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <input
              placeholder="description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <select
              value={form.platform}
              onChange={(e) =>
                setForm({
                  ...form,
                  platform: e.target.value,
                  platform_label: e.target.options[e.target.selectedIndex].text,
                })
              }
            >
              {options.map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
            <input
              placeholder="tags: react, nextjs"
              value={form.tags.join(", ")}
              onChange={(e) =>
                setForm({
                  ...form,
                  tags: e.target.value
                    .split(",")
                    .map((x) => x.trim())
                    .filter(Boolean),
                })
              }
            />
            <input
              placeholder="repository url"
              value={form.repo_url}
              onChange={(e) => setForm({ ...form, repo_url: e.target.value })}
            />
            <input
              placeholder="demo url"
              value={form.demo_url}
              onChange={(e) => setForm({ ...form, demo_url: e.target.value })}
            />
            <textarea
              placeholder="markdown content"
              value={form.markdown_content}
              onChange={(e) =>
                setForm({ ...form, markdown_content: e.target.value })
              }
            />
            <label>
              <input
                type="checkbox"
                checked={form.is_visible}
                onChange={(e) =>
                  setForm({ ...form, is_visible: e.target.checked })
                }
              />{" "}
              visible
            </label>
            <button>{form.id ? "UPDATE" : "ADD PROJECT"}</button>
          </form>
        </section>
        <section className="cmd-panel">
          <div className="cmd-panel-title">[ PROJECTS.DAT ]</div>
          {projects.map((p) => (
            <div className="cmd-project" key={p.id}>
              <span className="cmd-green">[{p.platform_label}]</span>
              <strong>{p.title}</strong>
              <button onClick={() => setForm(p)}>EDIT</button>
              <button onClick={() => p.id && remove(p.id)}>DELETE</button>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
