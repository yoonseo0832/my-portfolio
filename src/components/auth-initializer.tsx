"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
export default function AuthInitializer() {
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);
  useEffect(() => {
    void checkAuthStatus();
  }, [checkAuthStatus]);
  return null;
}
