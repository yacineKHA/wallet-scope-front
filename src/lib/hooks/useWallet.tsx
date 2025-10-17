import { useState } from "react";
import {
  getWallets,
  getWallet,
} from "../api/wallet";
import { Wallet, WalletData } from "@/types/wallet";

export default function useWallet() {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour sélectionner un wallet et récup ses données
  const selectWallet = async (wallet: Wallet) => {
    try {
      setIsLoading(true);
      setError(null);
      setSelectedWallet(wallet);
      const data = await getWallet(wallet.walletAddress);
      setWalletData(data);
    } catch (err) {
      console.error("Erreur lors de la récupération du wallet:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Erreur lors du chargement du wallet";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour récup tous les wallets
  const fetchWallets = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const walletsData = await getWallets();
      setWallets(walletsData);

      // Sélectionner automatiquement le wallet primary (premier de la liste car trié par isPrimary)
      if (walletsData.length > 0) {
        const primaryWallet =
          walletsData.find((w) => w.isPrimary) || walletsData[0];
        await selectWallet(primaryWallet);
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des wallets: ", err);
      setError("Erreur lors du chargement des wallets");
      setIsLoading(false);
    }
  };

  // Fonction pour rafraîchir les données
  const refetch = async () => {
    if (selectedWallet) {
      await selectWallet(selectedWallet);
    } else {
      await fetchWallets();
    }
  };

  return {
    wallets,
    selectedWallet,
    walletData,
    isLoading,
    error,
    fetchWallets,
    selectWallet,
    refetch,
  };
}
