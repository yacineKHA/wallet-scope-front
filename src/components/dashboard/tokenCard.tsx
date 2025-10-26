import { CryptoToken } from "@/types/tokens";
import { Card } from "../ui/card";
import Image from "next/image";
import { TrendingUp, TrendingDown } from "lucide-react";

const TokenCard = ({ token }: { token: CryptoToken }) => {
  const isPositive = token.change24h >= 0;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center gap-4 p-4">
        
        <div className="flex items-center gap-3 md:max-w-[200px] min-w-[200px]">
          {token.logo && (
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
              <Image
                src={token.logo}
                alt={token.symbol}
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-base truncate">{token.symbol}</h3>
            <p className="text-xs text-gray-500 truncate">{token.name}</p>
          </div>
          
          {/* Variation visible sur mobile uniquement, à côté du nom */}
          <div className={`flex md:hidden items-center gap-1 ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="text-sm font-medium">
              {isPositive ? "+" : ""}{Number(token.change24h).toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="flex flex-1 items-center md:justify-evenly justify-between">
          <div>
            <p className="text-xs text-gray-500">Balance</p>
            <p className="font-semibold text-sm truncate">
              {Number(token.balance).toFixed(4)}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Prix</p>
            <p className="font-semibold text-sm">
              ${Number(token.price).toFixed(2)}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Valeur</p>
            <p className="font-bold text-sm md:text-base">
              ${Number(token.value).toFixed(2)}
            </p>
          </div>
        </div>

          {/* Condition pour afficher la tendance en couleur selon la variation 24h sur desktop uniquement*/}
        <div className={`hidden md:flex items-center gap-1 min-w-[100px] justify-end min-w-[200px] ${
          isPositive ? "text-green-600" : "text-red-600"
        }`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span className="text-sm font-medium whitespace-nowrap">
            {isPositive ? "+" : ""}{Number(token.change24h).toFixed(2)}%
          </span>
        </div>
      </div>
    </Card>
  );
};

export default TokenCard;
