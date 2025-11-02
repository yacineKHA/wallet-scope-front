"use client";

import { useEffect } from "react";
import { apiClient } from "@/lib/api/client";
import { useAuthStore } from "@/store/authStore";
import { AxiosError } from "axios";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, clearUser } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
        try {
          const response = await apiClient.get("/user/me");
          setUser(response.data.data);
        } catch (err) {
          if (err instanceof AxiosError && err.response?.status === 401) {
            console.info("Utilisateur non authentifié");
          } else {
            console.error("Erreur lors de l'init de l'auth: ", err);
          }
          clearUser();
        } finally {
          console.info("AuthProvider initialisé");
        }
      };

    initAuth();
  }, [setUser, clearUser]);

  return <>{children}</>;
}