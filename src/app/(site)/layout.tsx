import VSCodeLayout from "@/components/vscode-layout";
import { LanguageProvider } from "@/context/LanguageContext";
import AuthInitializer from "@/components/auth-initializer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <LanguageProvider><AuthInitializer /><VSCodeLayout>{children}</VSCodeLayout></LanguageProvider>;
}
