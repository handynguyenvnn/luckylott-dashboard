import {PrizeGameEnum} from './enumerations/prize-game-enum.model';

export interface IBetTypePrize {
  id?: number;
  times?: number;
  prizeGame?: PrizeGameEnum;
  betTypeId?: number;
  betTypeName?: string;
}

export class BetTypePrize implements IBetTypePrize {
  constructor(public id?: number, public times?: number, public prizeGame?: PrizeGameEnum, public betTypeId?: number,
              public betTypeName?: string) {}
}
