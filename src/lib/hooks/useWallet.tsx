import { useState } from "react";
import {
  getWallets,
  getWallet,
  setPrimaryWallet,
  deleteWallet,
  addWallet,
} from "../api/wallet";
import { Wallet, WalletData } from "@/types/wallet";

interface UseWalletResponse {
  wallets: Wallet[];
  selectedWallet: Wallet | null;
  walletData: WalletData | null;
  isWalletLoading: boolean;
  walletError: string | null;
  fetchWallets: () => Promise<OperationResult>;
  selectWallet: (wallet: Wallet) => Promise<OperationResult>;
  addNewWallet: (walletAddress: string, walletName: string) => Promise<OperationResult>;
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
    } catch (err: any) {
      console.error("Erreur lors de la récupération du wallet:", err);
    
      setWalletError("Erreur lors du chargement du wallet");
      return { success: false, error: err.response.data.message };

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
    } catch (err: any) {
      console.error("Erreur lors de la récupération des wallets: ", err);
      setWalletError("Erreur lors du chargement des wallets");
      setIsWalletLoading(false);
      return { success: false, error: err.response.data.message };
    }
  };

  /**
   * Ajoute un nouveau wallet
   * @param walletAddress - L'adresse du wallet à ajouter
   * @param walletName - Le nom du wallet à ajouter
   * @returns {Promise<OperationResult>} - Réponse de succès ou erreur
   */
  const addNewWallet = async (walletAddress: string, walletName: string): Promise<OperationResult> => {
    try {
      setWalletError(null);
      await addWallet(walletAddress, walletName);
      
      await fetchWallets();

      return { success: true };
    } catch (err: any) {
      console.error("Erreur lors de l'ajout du wallet: ", err);
      setWalletError("Erreur lors de l'ajout du wallet");
      return { success: false, error: err.response.data.message };
    }
  };


  /**
   * Supprime un wallet par son ID
   * @param walletId - L'ID du wallet à supprimer
   * @returns {Promise<OperationResult>} - Réponse succès ou erreur
   */
  const deleteWalletById = async (walletId: string): Promise<OperationResult> => {
    try {
      setWalletError(null);
      await deleteWallet(walletId);
      
      await fetchWallets();
      return { success: true };
    } catch (err: any) {
      console.error("Erreur lors de la suppression du wallet: ", err);
      setWalletError("Erreur lors de la suppression du wallet");
      return { success: false, error: err.response.data.message };
    }
  };

  /**
   * Définit un wallet comme principal
   * @param walletId - L'ID du wallet à définir comme principal
   * @returns {Promise<OperationResult>} - Réponse succès ou erreur
   */
  const setPrimaryWalletId = async (walletId: string): Promise<OperationResult> => {
    try {
      setWalletError(null);
      await setPrimaryWallet(walletId);
      
      await fetchWallets();
      return { success: true };

    } catch (err: any) {
      setWalletError("Erreur lors de la mise à jour du wallet principal");
      console.error("Erreur lors de la mise à jour du wallet principal: ", err);
      return { success: false, error: err.response.data.message };
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
