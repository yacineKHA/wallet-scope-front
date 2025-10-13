import { useState } from "react";
import { authAPI } from "../api/auth";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export const useLogin = () => {
  const router = useRouter();
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoginLoading(true);
    try {
      await authAPI.login({ email, password });
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
