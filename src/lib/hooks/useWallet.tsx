import { useState } from "react";
import {
  getWallets,
  getWallet,
  setPrimaryWallet,
  deleteWallet,
  addWallet,
} from "../api/wallet";
import { Wallet, WalletData } from "@/types/wallet";
import { AxiosError } from "axios";

interface UseWalletResponse {
  wallets: Wallet[];
  selectedWallet: Wallet | null;
  walletData: WalletData | null;
  isWalletLoading: boolean;
  walletError: string | null;
  fetchWallets: () => Promise<OperationResult>;
  selectWallet: (wallet: Wallet) => Promise<OperationResult>;
  addNewWallet: (
    walletAddress: string,
    walletName: string
  ) => Promise<OperationResult>;
  deleteWalletById: (walletId: string) => Promise<OperationResult>;
  setPrimaryWalletId: (walletId: string) => Promise<OperationResult>;
}

interface OperationResult {
  success: boolean;
  error?: string;
}

/**
 * Hook pour la gestion des wallets
 */
export default function useWallet(): UseWalletResponse {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [isWalletLoading, setIsWalletLoading] = useState(true);
  const [walletError, setWalletError] = useState<string | null>(null);

  /**
   * Sélectionne un wallet et récupère ses données
   * @param wallet - Le wallet à sélectionner
   * @returns {Promise<OperationResult>} - Réponse succès ou erreur
   */
  const selectWallet = async (wallet: Wallet): Promise<OperationResult> => {
    try {
      setIsWalletLoading(true);
      setWalletError(null);
      setSelectedWallet(wallet);
      const data = await getWallet(wallet.walletAddress);
      setWalletData(data);
      return { success: true };
    } catch (err) {
      console.error("Erreur lors de la récupération du wallet:", err);
      const errorMessage = err instanceof AxiosError 
        ? err.response?.data?.message || "Erreur lors du chargement du wallet"
        : "Erreur lors du chargement du wallet";
      setWalletError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsWalletLoading(false);
    }
  };

  /**
   * Récupère tous les wallets de l'utilisateur connecté
   * @returns {Promise<OperationResult>} - Réponse succès ou erreur
   */
  const fetchWallets = async (): Promise<OperationResult> => {
    try {
      setIsWalletLoading(true);
      setWalletError(null);
      const walletsData = await getWallets();
      setWallets(walletsData);

      // Sélectionner automatiquement le wallet primary (premier de la liste car trié par isPrimary)
      if (walletsData.length > 0) {
        const primaryWallet =
          walletsData.find((w) => w.isPrimary) || walletsData[0];
        await selectWallet(primaryWallet);
      } else {
        setIsWalletLoading(false);
      }
      return { success: true };
    } catch (err) {
      console.error("Erreur lors de la récupération des wallets:", err);
      const errorMessage = err instanceof AxiosError
        ? err.response?.data?.message || "Erreur lors du chargement des wallets"
        : "Erreur lors du chargement des wallets";
      setWalletError(errorMessage);
      setIsWalletLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  /**
   * Ajoute un nouveau wallet
   * @param walletAddress - L'adresse du wallet à ajouter
   * @param walletName - Le nom du wallet à ajouter
   * @returns {Promise<OperationResult>} - Réponse succès ou erreur
   */
  const addNewWallet = async (
    walletAddress: string,
    walletName: string
  ): Promise<OperationResult> => {
    try {
      setWalletError(null);
      await addWallet(walletAddress, walletName);

      // Refresh en arrière-plan
      try {
        await fetchWallets();
      } catch {
        console.warn("Impossible de rafraîchir la liste, mais l'ajout a réussi");
      }

      return { success: true };
    } catch (err) {
      console.error("Erreur lors de l'ajout du wallet:", err);
      const errorMessage = err instanceof AxiosError
        ? err.response?.data?.message || "Erreur lors de l'ajout du wallet"
        : "Erreur lors de l'ajout du wallet";
      setWalletError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  /**
   * Supprime un wallet par son ID
   * @param walletId - L'ID du wallet à supprimer
   * @returns {Promise<OperationResult>} - Réponse succès ou erreur
   */
  const deleteWalletById = async (
    walletId: string
  ): Promise<OperationResult> => {
    try {
      setWalletError(null);
      await deleteWallet(walletId);

      // Refresh en arrière-plan
      try {
        await fetchWallets();
      } catch {
        console.warn("Impossible de rafraîchir la liste, mais la suppression a réussi");
      }

      return { success: true };
    } catch (err) {
      console.error("Erreur lors de la suppression du wallet:", err);
      const errorMessage = err instanceof AxiosError
        ? err.response?.data?.message || "Erreur lors de la suppression du wallet"
        : "Erreur lors de la suppression du wallet";
      setWalletError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  /**
   * Définit un wallet comme principal
   * @param walletId - L'ID du wallet à définir comme principal
   * @returns {Promise<OperationResult>} - Réponse succès ou erreur
   */
  const setPrimaryWalletId = async (
    walletId: string
  ): Promise<OperationResult> => {
    try {
      setWalletError(null);
      await setPrimaryWallet(walletId);

      // Refresh en arrière-plan
      try {
        await fetchWallets();
      } catch {
        console.warn("Impossible de rafraîchir la liste, mais la mise à jour a réussi");
      }

      return { success: true };
    } catch (err) {
      console.error("Erreur lors de la mise à jour du wallet principal:", err);
      const errorMessage = err instanceof AxiosError
        ? err.response?.data?.message || "Erreur lors de la mise à jour du wallet principal"
        : "Erreur lors de la mise à jour du wallet principal";
      setWalletError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  return {
    wallets,
    selectedWallet,
    walletData,
    isWalletLoading,
    walletError,
    fetchWallets,
    selectWallet,
    addNewWallet,
    deleteWalletById,
    setPrimaryWalletId,
  };
}
