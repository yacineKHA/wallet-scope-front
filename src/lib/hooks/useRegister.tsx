import { useState } from "react";
import { authAPI } from "../api/auth";
import { AxiosError } from "axios";

export const useRegister = () => {
  const [signupError, setSignupError] = useState<string | null>(null);
  const [isSignupLoading, setIsSignupLoading] = useState<boolean>(false);

  const signup = async (email: string, username:string, password: string) => {
    setIsSignupLoading(true);

    try {
      await authAPI.register({ email, username, password });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message = error?.response?.data?.message;
        setSignupError(message);
        throw new Error(message);
      } else {
        setSignupError("Erreur inattendue lors de la connexion");
        throw new Error("Erreur inattendue lors de la connexion");
      }
    } finally {
      setIsSignupLoading(false);
    }
  };

  return { signup, signupError, isSignupLoading };
};
