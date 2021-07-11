import {BetType} from './enumerations/bet-type.model';

export interface IPoolReward {
  id?: number;
  times?: number;
  betType?: BetType;
  equalSharePercent?: number;
  poolId?: number;
  poolName?: string;
}

export class PoolReward implements IPoolReward {
  constructor(
    public id?: number,
    public times?: number,
    public betType?: BetType,
    public equalSharePercent?: number,
    public poolId?: number,
    public poolName?: string
  ) {}
}
