import { useState } from "react";
import { authAPI } from "../api/auth";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useAuthStore } from "@/store/authStore";
import { apiClient } from "../api/client";

interface UseLoginResponse {
  login: (email: string, password: string) => Promise<void>;
  isLoginLoading: boolean;
  loginError: string | null;
}

/**
 * Hook pour la connexion utilisateur via email et mot de passe
 */
export const useLogin = (): UseLoginResponse => {
  const router = useRouter();
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { setUser } = useAuthStore();

  /**
   * Connexion utilisateur via email et mot de passe
   * @param email - Email de l'utilisateur
   * @param password - Mot de passe de l'utilisateur
   * @returns {Promise<void>} - Réponse
   */
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoginLoading(true);
    try {
      await authAPI.login({ email, password });

      const response = await apiClient.get("/user/me");

      // setUser pour lestore auth
      setUser(response.data.data);

      router.replace("/dashboard");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message = error?.response?.data?.message;
        setLoginError(message);
        throw new Error(message);
      } else {
        setLoginError("Erreur inattendue lors de la connexion");
        throw new Error("Erreur inattendue lors de la connexion");
      }
    } finally {
      setIsLoginLoading(false);
    }
  };

  return { login, isLoginLoading, loginError };
};
