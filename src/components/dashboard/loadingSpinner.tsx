import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
    message?: string;
}

const LoadingSpinner = ({ message = "Chargement de votre portefeuille..." }: LoadingSpinnerProps) => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                <p className="text-sm text-muted-foreground">{message}</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;