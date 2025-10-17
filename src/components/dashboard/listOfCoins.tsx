"use client";

import { CryptoToken } from "@/types/tokens";
import { useEffect } from "react";
import TokenCard from "./tokenCard";

const ListOfCoins = ({ tokens }: { tokens: CryptoToken[] }) => {
  useEffect(() => {
    console.log("walletData dans listOfCoins: ", tokens);
  }, [tokens]);

  return (
    <div>
      <h1>List of Coins</h1>
      <div className="flex flex-col gap-5">
        {tokens.map((token, index) => (
          <div key={index} className="">
            <TokenCard token={token} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListOfCoins;
