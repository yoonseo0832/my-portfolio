"use client";
import { FormEvent, useRef, useState } from "react";
import { ChevronUp, X } from "lucide-react";
import { useRouter } from "next/navigation";
const prompt = "guest@yoonseo-portfolio:~$";
const helpLines = [
  "Available commands:",
  "  /about     Open the about page",
  "  /projects  Open the projects page",
  "  /blog      Open the blog page",
  "  /contact   Open the contact page",
  "  github     Open GitHub in a new tab",
  "  tistory    Open Tistory in a new tab",
  "  /help      Show this command list",
  "  clear      Clear terminal output",
];
export default function Terminal() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [command, setCommand] = useState("");
  const [open, setOpen] = useState(true);
  const [history, setHistory] = useState([
    "Welcome to yoonseo-portfolio terminal.",
    "Type '/help' to see available commands.",
  ]);
  function run(event: FormEvent) {
    event.preventDefault();
    const value = command.trim().toLowerCase();
    setCommand("");
    if (!value) return;
    if (value === "clear") {
      setHistory([]);
      return;
    }
    const lines = [`${prompt} ${value}`];
    if (["/about", "/projects", "/blog", "/contact"].includes(value)) {
      setHistory((h) => [...h, ...lines, `Opening ${value}...`]);
      router.push(value === "/about" ? "/" : value);
    } else if (value === "/help" || value === "help")
      setHistory((h) => [...h, ...lines, ...helpLines]);
    else if (value === "github" || value === "tistory") {
      setHistory((h) => [...h, ...lines, `Opening ${value}...`]);
      window.open(
        value === "github"
          ? "https://github.com/yoonseo0832"
          : "https://yoonseo0832.tistory.com",
        "_blank",
        "noopener,noreferrer",
      );
    } else
      setHistory((h) => [
        ...h,
        ...lines,
        `command not found: ${value}. Type '/help' for available commands.`,
      ]);
  }
  if (!open)
    return (
      <div className="terminal-collapsed">
        <span>TERMINAL</span>
        <span>zsh</span>
        <button onClick={() => setOpen(true)} aria-label="Open terminal">
          <ChevronUp size={15} />
        </button>
      </div>
    );
  return (
    <section
      className="terminal-panel"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="terminal-header">
        <span>TERMINAL</span>
        <span>zsh</span>
        <button onClick={() => setOpen(false)} aria-label="Close terminal">
          <X size={15} />
        </button>
      </div>
      <div className="terminal-output">
        {history.map((line, i) => (
          <div key={`${line}-${i}`}>{line}</div>
        ))}
        <form className="terminal-form" onSubmit={run}>
          <span className="terminal-prompt">{prompt}</span>
          <input
            ref={inputRef}
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            aria-label="Terminal command"
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
    </section>
  );
}
