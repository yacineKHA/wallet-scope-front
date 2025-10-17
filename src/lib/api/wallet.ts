import { apiClient } from "./client";
import { Wallet, WalletData } from "@/types/wallet";



/**
 * Récupère tous les wallets de l'utilisateur (triés par isPrimary)
 */
export const getWallets = async (): Promise<Wallet[]> => {
  const response = await apiClient.get("/wallet/");
  return response.data.data.wallets;
};

/**
 * Récupère les détails complets d'un wallet avec données blockchain
 */
export const getWallet = async (walletAddress: string): Promise<WalletData> => {
  const response = await apiClient.post("/wallet/details", { walletAddress });
  return response.data.data;
};

/**
 * Ajoute un nouveau wallet
 */
export const addWallet = async (walletAddress: string, walletName: string) => {
  const response = await apiClient.post("/wallet/", {
    walletAddress,
    walletName,
  });
  return response.data;
};

/**
 * Définit un wallet comme principal
 */
export const setPrimaryWallet = async (walletId: string) => {
  const response = await apiClient.patch(`/wallet/${walletId}/primary`);
  return response.data;
};

/**
 * Supprime un wallet
 */
export const deleteWallet = async (walletId: string) => {
  const response = await apiClient.delete(`/wallet/${walletId}`);
  return response.data;
};

