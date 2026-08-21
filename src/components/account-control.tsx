"use client";
import { useState } from "react";
import { CircleUser, LogOut, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
export default function AccountControl() {
  const router = useRouter();
  const {
    isAdmin,
    isLoginModalOpen,
    openLoginModal,
    closeLoginModal,
    setAdmin,
    logout,
  } = useAuthStore();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  async function login(event: React.FormEvent) {
    event.preventDefault();
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!response.ok) {
      setError("Invalid password");
      return;
    }
    setAdmin(true);
    closeLoginModal();
    setPassword("");
    router.push("/admin");
  }
  async function signOut() {
    await logout();
    router.push("/");
  }
  return (
    <>
      <button
        className={`activity-icon account-control ${isAdmin ? "authenticated" : ""}`}
        onClick={() => (isAdmin ? router.push("/admin") : openLoginModal())}
        title={isAdmin ? "Admin (administrator mode)" : "Accounts / Login"}
        aria-label="Account"
      >
        <CircleUser size={21} />
        {isAdmin && <span className="online-dot" />}
      </button>
      {isAdmin && (
        <button className="account-admin-link" onClick={signOut}>
          <ShieldCheck size={14} /> Admin mode · <LogOut size={13} /> Logout
        </button>
      )}
      <Dialog
        open={isLoginModalOpen}
        onOpenChange={(open) => (open ? openLoginModal() : closeLoginModal())}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin login</DialogTitle>
          </DialogHeader>
          <form className="account-form" onSubmit={login}>
            <Input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoFocus
            />
            {error && <p className="account-error">{error}</p>}
            <Button type="submit">Sign in</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
