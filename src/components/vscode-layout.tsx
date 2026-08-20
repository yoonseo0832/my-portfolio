"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Files,
  Search,
  GitBranch,
  Bug,
  Blocks,
  Settings,
  X,
  Bell,
  CheckCircle2,
  Globe,
  Link2,
} from "lucide-react";
import AccountControl from "@/components/account-control";
import Terminal from "@/components/terminal";
import { useTranslation } from "@/context/LanguageContext";
type SidebarFile = {
  name: string;
  href?: string;
  url?: string;
  key?: string;
  icon: string;
  color: string;
  isExternal?: boolean;
};
const files: SidebarFile[] = [
  { name: "about.md", href: "/", key: "about", icon: "▣", color: "#519aba" },
  {
    name: "projects.json",
    href: "/projects",
    key: "projects",
    icon: "{}",
    color: "#cbcb41",
  },
  {
    name: "tistory.rss",
    href: "/blog",
    key: "blog",
    icon: "◉",
    color: "#e37933",
  },
  {
    name: "contact.sh",
    href: "/contact",
    key: "contact",
    icon: "$",
    color: "#89d185",
  },
  {
    name: "github.symlink",
    url: "https://github.com/yoonseo0832",
    icon: "",
    color: "#c5c5c5",
    isExternal: true,
  },
  {
    name: "tistory.symlink",
    url: "https://yoonseo0832.tistory.com",
    icon: "",
    color: "#c5c5c5",
    isExternal: true,
  },
];
export default function VSCodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const current = files.find((file) => file.href === pathname) ?? files[0];
  const { locale, toggleLocale, t } = useTranslation();
  function openExternal(file: SidebarFile) {
    if (file.url) window.open(file.url, "_blank", "noopener,noreferrer");
  }
  return (
    <div className="vscode-shell">
      <aside className="activity-bar">
        <div className="activity-top">
          {[Files, Search, GitBranch, Bug, Blocks].map((Icon, i) => (
            <button
              key={i}
              className={`activity-icon ${i === 0 ? "selected" : ""}`}
              aria-label="activity"
            >
              <Icon size={22} />
            </button>
          ))}
        </div>
        <div className="activity-bottom">
          <AccountControl />
          <button className="activity-icon" aria-label="Settings">
            <Settings size={21} />
          </button>
          <button
            className="activity-icon language-toggle"
            onClick={toggleLocale}
            title={
              locale === "ko"
                ? t("common.switchToEnglish")
                : t("common.switchToKorean")
            }
            aria-label="Toggle language"
          >
            <Globe size={20} />
          </button>
        </div>
      </aside>
      <aside className="file-sidebar">
        <div className="sidebar-title">
          <span>{t("common.explorer")}</span>
          <span>···</span>
        </div>
        <div className="workspace-name">
          <span className="chevron">⌄</span> {t("common.portfolio")}
        </div>
        <nav className="file-tree">
          {files.map((file) =>
            file.isExternal ? (
              <button
                key={file.name}
                type="button"
                onClick={() => openExternal(file)}
                className="file-item external-file"
              >
                <Link2 size={14} style={{ color: file.color }} />
                <span>{file.name}</span>
              </button>
            ) : (
              <Link
                key={file.name}
                href={file.href ?? "/"}
                className={`file-item ${current.href === file.href ? "active" : ""}`}
              >
                <span className="file-icon" style={{ color: file.color }}>
                  {file.icon}
                </span>
                {file.name}
              </Link>
            ),
          )}
        </nav>
      </aside>
      <main className="editor-area">
        <div className="editor-tabs">
          <div className="editor-tab active">
            <span className="file-icon" style={{ color: current.color }}>
              {current.icon}
            </span>
            {current.name}
            <X size={14} />
          </div>
        </div>
        <div className="editor-content">{children}</div>
        <Terminal />
        <footer className="status-bar">
          <span>
            <GitBranch size={14} /> main
          </span>
          <span className="status-message">
            <CheckCircle2 size={14} /> Ready
          </span>
          <span>Ln 1, Col 1</span>
          <span>UTF-8</span>
          <span>LF</span>
          <Bell size={14} />
        </footer>
      </main>
    </div>
  );
}
