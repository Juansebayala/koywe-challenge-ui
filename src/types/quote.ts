export enum Currency {
  ARS = "ARS",
  CLP = "CLP",
  USDC = "USDC",
  BTC = "BTC",
  ETH = "ETH",
}

export interface CreateQuoteRequest {
  amount: number;
  from: Currency;
  to: Currency;
}

export interface Quote {
  id: string;
  amount: number;
  from: Currency;
  to: Currency;
  rate: number;
  convertedAmount: number;
  timestamp: string;
  expiresAt: string;
}
