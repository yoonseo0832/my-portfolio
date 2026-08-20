import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import VSCodeLayout from "@/components/vscode-layout";
import { LanguageProvider } from "@/context/LanguageContext";
import AuthInitializer from "@/components/auth-initializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "portfolio — VS Code",
  description: "A developer portfolio styled like VS Code.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full">
        <LanguageProvider><AuthInitializer /><VSCodeLayout>{children}</VSCodeLayout></LanguageProvider>
      </body>
    </html>
  );
}
