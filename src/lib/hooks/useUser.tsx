"use client";

import { useEffect, useState } from "react";
import { apiClient } from "../api/client";
import { useAuthStore } from "@/store/authStore";
import { User } from "@/types/user";

interface UseUserResponse {
  user: User | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  error: string | null;
}

/**
 * Hook pour la gestion du user connecté
 */
const useUser = (): UseUserResponse => {
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated, isAuthLoading, setUser, clearUser } = useAuthStore();

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      try {
        const response = await apiClient.get("/user/me");
        setUser(response.data.data);
        setError(null);
      } catch (err) {
        console.error("Erreur récupération utilisateur:", err);
        setError("Erreur récupération utilisateur");
        clearUser();
      }
    };
    
    fetchUser();
  }, [setUser, clearUser]);

  return { user, isAuthenticated, isAuthLoading, error };
};

export default useUser;
