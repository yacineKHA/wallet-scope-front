"use client";

import { WalletData } from "@/types/wallet";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { use, useEffect } from "react";

interface WalletSummaryProps {
    walletData: WalletData;
}

const WalletSummary = ({ walletData }: WalletSummaryProps) => {

    useEffect(() => {
        console.log(walletData);
    }, [walletData]);
    return (
        <Card>
            <CardHeader>
                <CardTitle>{walletData.wallet.walletName}</CardTitle>
                <CardDescription className="text-xs md:text-xl truncate">
                    {walletData.wallet.walletAddress}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div>
                    <p className="text-sm text-muted-foreground">Valeur totale</p>
                    <p className="text-3xl font-bold">
                        ${walletData.result.totalValue.toLocaleString("fr-FR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}
                    </p>
                </div>
                <p className="text-sm text-muted-foreground">
                    {walletData.result.tokens.length} token(s) trouvé(s)
                </p>
            </CardContent>
        </Card>
    );
};

export default WalletSummary;

