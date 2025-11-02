"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useWallet from "@/lib/hooks/useWallet";
import { toast } from "sonner";
import DashboardHeader from "@/components/dashboard/header/header";
import BadgePrimary from "@/components/wallets/badgeIsPrimary";
import AddWalletForm from "@/components/wallets/addWalletForm";

export default function WalletsPage() {
  const [isAdding, setIsAdding] = useState(false);
  const [newWalletAddress, setNewWalletAddress] = useState("");
  const [newWalletName, setNewWalletName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { wallets, fetchWallets, addNewWallet, deleteWalletById, setPrimaryWalletId } = useWallet();

  useEffect(() => {
    fetchWallets();
  }, []);

  const handleAddWallet = async () => {
    if (!newWalletAddress || !newWalletName) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    setIsLoading(true);
    const result = await addNewWallet(newWalletAddress, newWalletName);
    if (result.success) {
      toast.success("Wallet ajouté avec succès");
      setNewWalletAddress("");
      setNewWalletName("");
      setIsAdding(false);
      setIsLoading(false);
    } else {
      console.log("result: ", result);
      toast.error(result.error || "Erreur lors de l'ajout du wallet");
      setIsLoading(false);
    }
  };

  const handleDeleteWallet = async (walletId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce wallet ?")) return;

    try {
      const result = await deleteWalletById(walletId);
      if (result.success) {
        toast.success("Wallet supprimé avec succès");
        fetchWallets();
      } else {
        toast.error(result.error || "Erreur lors de la suppression du wallet");
      }
    } catch (error) {
      console.error("Erreur inattendue lors de la suppression du wallet: ", error);
      toast.error("Erreur inattendue lors de la suppression");
    }
  };

  const handleSetPrimary = async (walletId: string) => {
    try {
      const result = await setPrimaryWalletId(walletId);
      if (result.success) {
        toast.success("Wallet principal défini avec succès");
        fetchWallets();
      } else {
        toast.error(result.error || "Erreur lors de la définition du wallet principal");
      }
    } catch (error) {
      console.error("Erreur inattendue lors de la définition du wallet principal: ", error);
      toast.error("Erreur inattendue lors de la définition du wallet principal");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <DashboardHeader
        title="Mes Wallets"
        description="Gérez vos adresses de portefeuilles"
      />

      {/* Liste des wallets */}
      <div className="space-y-4 mb-6">
        {wallets.map((wallet) => (
          <Card key={wallet.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    {wallet.walletName}
                    {wallet.isPrimary && <BadgePrimary />}
                  </CardTitle>
                  <CardDescription className="font-mono text-xs mt-2">
                    {wallet.walletAddress}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {!wallet.isPrimary && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSetPrimary(wallet.id)}
                      title="Définir comme principal"
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteWallet(wallet.id)}
                    disabled={wallet.isPrimary}
                    title={
                      wallet.isPrimary
                        ? "Impossible de supprimer le wallet principal"
                        : "Supprimer"
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Ajouté le{" "}
                {new Date(wallet.createdAt).toLocaleDateString("fr-FR")}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Formulaire d'ajout */}
      {isAdding ? (
        <AddWalletForm
          newWalletName={newWalletName}
          newWalletAddress={newWalletAddress}
          setNewWalletName={setNewWalletName}
          setNewWalletAddress={setNewWalletAddress}
          handleAddWallet={handleAddWallet}
          isLoading={isLoading}
          setIsAdding={setIsAdding}
        />
      ) : (
        <Button onClick={() => setIsAdding(true)} className="w-full" size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Ajouter un wallet
        </Button>
      )}
    </div>
  );
}
