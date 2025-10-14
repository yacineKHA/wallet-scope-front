import { useRouter } from "next/navigation";
import { authAPI } from "../api/auth";
import { useAuthStore } from "@/store/authStore";

export const useLogout = (): { logout: () => void } => {
  const router = useRouter();
  const { clearUser } = useAuthStore();

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Erreur lors de la déconnexion: ", error);
    } finally {
      clearUser();
      router.push("/login");
    }
  };
  return { logout };
};
