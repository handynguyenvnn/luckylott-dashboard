import { IPlayerCredit } from './player-credit.model';

export interface IPlayer {
  id?: number;
  teleId?: number;
  teleName?: string;
  refCode?: string;
  username?: string;
  balance?: number;
  playerCredits?: IPlayerCredit[];
  playerBalances?: any[];
  playerWallets?: any[];
}

export class Player implements IPlayer {
  constructor(
    public id?: number,
    public teleId?: number,
    public teleName?: string,
    public balance?: number,
    public refCode?: string,
    public username?: string,
    public playerCredits?: IPlayerCredit[],
    public playerBalances?: any[],
    public playerWallets?: any[]
  ) {}
}
