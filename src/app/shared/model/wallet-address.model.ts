export interface IWalletAddress {
  id?: number;
  address?: string;
  addressType?: string;
  teleId?: number;
  playerId?: number;
}

export class WalletAddress implements IWalletAddress {
  constructor(public id?: number, public address?: string
    , public addressType?: string, public playerId?: number,
              public teleId?: number) {}
}
