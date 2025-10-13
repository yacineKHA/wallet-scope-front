import axios from "axios";

export const apiClient = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let isRefreshing = false;

apiClient.interceptors.response.use(
  (response) => {
    console.info("Response success: ", response);
    return response;
  }, // Si requete reussie on retourne la reponse directement
  async (error) => {
    const originalRequest = error.config;
    if (!error.response) return Promise.reject(error); // Si pas de reponse on rejette l'erreur

    if (error.response.status === 401 && !originalRequest._retry) {
      console.log("...401 détecté...");
      //Evite les boucles infinies
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          const interval = setInterval(() => {
            if (!isRefreshing) {
              clearInterval(interval);
              // Quand le refresh est fini, on retente la requête
              apiClient(originalRequest).then(resolve).catch(reject);
            }
          }, 500); // on check toutes les 500ms
        });
      }
      isRefreshing = true;
      try {
        const response = await apiClient.post("/user/refresh-token"); // nouveau token
        console.log("Response: ", response);
        isRefreshing = false;
        // On réessaye la requête originale
        return apiClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        // Si le refresh échoue, on redirige vers login
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
