import axios from "axios";
import { authAPI } from "./auth";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const excludedUrls = [
  "/auth/login",
  "/auth/register",
  "/auth/refresh",
  "/auth/logout",
  "/user/me",
];

apiClient.interceptors.response.use(
  // si reponse reussie, on retourne la reponse
  (response) => response,

  async (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }
    const isExcluded = excludedUrls.some((url) =>
      error.config.url?.includes(url)
    );

    if (isExcluded) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !error.config.retry) {
      error.config.retry = true;
      try {
        await apiClient.post("/auth/refresh");
        return apiClient(error.config);
      } catch (error) {
        console.error("Refresh token echoué: ", error);
        try {
          authAPI.logout();
        } catch (logoutError) {
          console.warn("Erreur lors de la déconnexion: ", logoutError);
        }

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
