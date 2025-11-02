import { Wallet as WalletIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JSX } from "react";

interface EmptyWalletProps {
    title: string;
    description: string;
    buttonText: string;
    onButtonClick?: () => void;
}

const EmptyWallet = ({ 
    title, 
    description, 
    buttonText,
    onButtonClick 
}: EmptyWalletProps): JSX.Element => {
    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <WalletIcon className="h-16 w-16 text-muted-foreground mb-4" />
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                <p className="text-muted-foreground mb-6">
                    {description}
                </p>
                <Button onClick={onButtonClick}>
                    {buttonText}
                </Button>
            </div>
        </div>
    );
};

export default EmptyWallet;