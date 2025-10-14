"use client";

import { useEffect, useState } from "react";
import { apiClient } from "../api/client";
import { useAuthStore } from "@/store/authStore";
import { User } from "@/types/user";

const useUser = (): { user: User | null, isAuthenticated: boolean, isLoading: boolean, error: string | null } => {
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated, isLoading, setUser, clearUser } = useAuthStore();

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

  return { user, isAuthenticated, isLoading, error };
};

export default useUser;
