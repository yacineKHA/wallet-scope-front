import { CryptoToken } from "./tokens";

export interface WalletPortfolio {
  tokens: CryptoToken[];
  totalValue: number;
}

export interface Wallet {
  id: string;
  userId: string;
  walletAddress: string;
  walletName: string;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WalletData {
  wallet: Wallet;
  result: WalletPortfolio;
}
