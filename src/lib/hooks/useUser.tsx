"use client";

import { useEffect, useState } from "react";
import { apiClient } from "../api/client";
import { User } from "@/types/user";

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.get("/user/me");
        setUser(response.data.data);
        setError(null);
      } catch (err) {
        console.error(
          "useUser: Erreur lors de la récupération de l'utilisateur:",
          err
        );
        setError("Impossible de charger l'utilisateur");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return { user, loading, error };
};

export default useUser;
