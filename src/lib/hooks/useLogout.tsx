import { useRouter } from "next/navigation";
import { authAPI } from "../api/auth";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";

interface UseLogoutResponse {
  logout: () => Promise<void>;
  isLogoutLoading: boolean;
  logoutError: string | null;
}

/**
 * Hook pour la déconnexion utilisateur
 */
export default function useLogout(): UseLogoutResponse {
  const router = useRouter();
  const { clearUser } = useAuthStore();
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  const logout = async (): Promise<void> => {
    setIsLogoutLoading(true);
    try {
      await authAPI.logout();
    } catch (error: unknown) {
      console.error("Erreur lors de la déconnexion: ", error);
      setLogoutError("Erreur lors de la déconnexion");
    } finally {
      clearUser();
      setIsLogoutLoading(false);
      router.push("/login");
    }
  };
  return { logout, isLogoutLoading, logoutError };
}
