export interface IPoolWallet {
  id?: number;
  balance?: number;
  address?: string;
  poolId?: number;
  tokenNetworkId?: number;
}

export class PoolWallet implements IPoolWallet {
  constructor(
    public id?: number,
    public balance?: number,
    public address?: string,
    public poolId?: number,
    public tokenNetworkId?: number
  ) {}
}
