import { FromTypeEnum } from './enumerations';

export interface IPlayerCredit {
  id?: number;
  amount?: number;
  fromType?: FromTypeEnum;
  playerId?: number;
  teleId?: number;
  teleName?: string;
}

export class PlayerCredit implements IPlayerCredit {
  constructor(public id?: number, public amount?: number,
              public fromType?: FromTypeEnum, public playerId?: number,
              public teleId?: number, public teleName?: string) {}
}
