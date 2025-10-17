import { CryptoToken } from "@/types/tokens";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

const tokenCard = ({ token }: { token: CryptoToken }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{token.symbol}</CardTitle>
                <CardDescription>{token.name}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{Number(token.balance).toFixed(5)}</p>
                <p>{Number(token.price).toFixed(2)}</p>
                <p>{Number(token.value).toFixed(2)}</p>
                <p>{Number(token.change24h).toFixed(2)}%</p>
            </CardContent>
        </Card>
    );
};

export default tokenCard;