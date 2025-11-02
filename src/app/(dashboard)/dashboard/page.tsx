"use client";

import { useEffect } from "react";
import useWallet from "@/lib/hooks/useWallet";
import LoadingSpinner from "@/components/dashboard/loadingSpinner";
import EmptyWallet from "@/components/dashboard/emptyWallet";
import WalletSummary from "@/components/dashboard/walletSummary";
import ListOfCoins from "@/components/dashboard/listOfCoins";
import { useAuthStore } from "@/store/authStore";

export default function DashboardPage() {
    const { isAuthenticated, isAuthLoading } = useAuthStore();
    const { walletData, isWalletLoading, walletError, fetchWallets } = useWallet();

    useEffect(() => {
        if (isAuthenticated && !isAuthLoading) {
            fetchWallets();
        }

    }, [isAuthenticated, isAuthLoading]);

    if (walletError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500">{walletError}</div>
            </div>
        );
    }

    if (isAuthLoading || isWalletLoading) {
        return <LoadingSpinner />;
    }

    if (walletError) {
        return (
            <EmptyWallet
                title="Aucun portefeuille trouvé"
                description="Ajoutez votre premier portefeuille pour commencer à suivre vos cryptomonnaies"
                buttonText="Ajouter un portefeuille"
            />
        );
    }

    if (!walletData) {
        return (
            <EmptyWallet
                title="Aucun portefeuille"
                description="Connectez votre premier wallet pour voir vos actifs"
                buttonText="Ajouter un wallet"
            />
        );
    }

    // Affichage du dashboard avec les données
    return (
        <div className="container mx-auto p-6">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                </div>

                <WalletSummary walletData={walletData} />
                <ListOfCoins tokens={walletData.result.tokens} />
            </div>
        </div>
    );
}
