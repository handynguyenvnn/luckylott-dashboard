export interface Trade {
    userName: string;
    volume: number;
    summary: string;
    confirmed: number;
    feedbackScore: number;
    trusted: number;
    like: number;
    dislike: number;
}

export interface TradeHistory {
  completedDate: string;
  buyer: string;
  seller: string;
  typeCoin: string;
  currency: string;
  price: number;
  volume: number;
  fees: number;
  buyerRating: number;
  sellerRating: number;
  total: number;
}

interface Member {
    avatar: string;
    name: string;
}
