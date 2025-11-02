import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JSX } from "react";


interface AddWalletFormProps {
    newWalletName: string;
    newWalletAddress: string;
    setNewWalletName: (value: string) => void;
    setNewWalletAddress: (value: string) => void;
    handleAddWallet: () => void;
    isLoading: boolean;
    setIsAdding: (value: boolean) => void;
}

const AddWalletForm = ({newWalletName, newWalletAddress, setNewWalletName, setNewWalletAddress, handleAddWallet, isLoading, setIsAdding}: AddWalletFormProps): JSX.Element => {
    return (
        <Card>
          <CardHeader>
            <CardTitle>Ajouter un wallet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Nom du wallet
              </label>
              <Input
                placeholder="Nom de mon wallet"
                value={newWalletName}
                onChange={(e) => setNewWalletName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Adresse du wallet
              </label>
              <Input
                placeholder="0x..."
                value={newWalletAddress}
                onChange={(e) => setNewWalletAddress(e.target.value)}
                className="font-mono"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleAddWallet}
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? "Ajout en cours..." : "Ajouter"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAdding(false);
                  setNewWalletAddress("");
                  setNewWalletName("");
                }}
                className="flex-1"
              >
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
    );
};

export default AddWalletForm;