"use client";
import { useEffect, useState } from "react";
type Key = "about" | "contact";
const keys: Key[] = ["about", "contact"];
export default function AdminContentManager() {
  const [content, setContent] = useState<Record<Key, string>>({
    about: "",
    contact: "",
  });
  const [history, setHistory] = useState<Record<Key, string[]>>({
    about: [],
    contact: [],
  });
  const [messages, setMessages] = useState<Record<Key, string>>({
    about: "",
    contact: "",
  });
  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => (r.ok ? r.json() : []))
      .then((rows) =>
        setContent((current) =>
          rows.reduce(
            (
              next: Record<Key, string>,
              row: { key: Key; content: string },
            ) => ({ ...next, [row.key]: row.content }),
            current,
          ),
        ),
      )
      .catch(() =>
        setMessages({
          about: "ERROR: load failed",
          contact: "ERROR: load failed",
        }),
      );
  }, []);
  function update(key: Key, value: string) {
    setHistory((current) => ({
      ...current,
      [key]: [...current[key], content[key]].slice(-30),
    }));
    setContent((current) => ({ ...current, [key]: value }));
  }
  function undo(key: Key) {
    const previous = history[key].at(-1);
    if (previous === undefined) return;
    setContent((current) => ({ ...current, [key]: previous }));
    setHistory((current) => ({ ...current, [key]: current[key].slice(0, -1) }));
  }
  async function save(key: Key) {
    const r = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, content: content[key] }),
    });
    setMessages((current) => ({
      ...current,
      [key]: r.ok ? `${key} saved` : "ERROR: save failed",
    }));
  }
  return (
    <section className="cmd-panel">
      <div className="cmd-panel-title">[ SITE CONTENT // MARKDOWN ]</div>
      {keys.map((key) => (
        <div className="content-editor" key={key}>
          <label>{key === "about" ? "about.md" : "contact.sh"}</label>
          <textarea
            value={content[key]}
            placeholder={`Edit ${key} content...`}
            onChange={(e) => update(key, e.target.value)}
          />
          <div className="content-actions">
            <button onClick={() => save(key)}>SAVE {key.toUpperCase()}</button>
            <button onClick={() => undo(key)} disabled={!history[key].length}>
              UNDO
            </button>
            {messages[key] && (
              <span
                className={
                  messages[key].startsWith("ERROR") ? "cmd-error" : "cmd-green"
                }
              >
                {messages[key]}
              </span>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
