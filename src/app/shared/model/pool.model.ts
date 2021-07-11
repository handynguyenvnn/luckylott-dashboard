import {PoolType} from './enumerations/pool-type.model';
import {IPoolReward} from './pool-reward.model';
import {ISettingPool} from './setting-pool.model';


export interface IPool {
  id?: number;
  name?: string;
  balance?: number;
  initDeposit?: number;
  betAmount?: number;
  poolType?: PoolType;
  settingPools?: ISettingPool[];
  tokenId?: number;
  poolRewards?: IPoolReward[];
}

export class Pool implements IPool {
  constructor(
    public id?: number,
    public name?: string,
    public balance?: number,
    public initDeposit?: number,
    public betAmount?: number,
    public poolType?: PoolType,
    public settingPools?: ISettingPool[],
    public tokenId?: number,
    public poolRewards?: IPoolReward[]
  ) {}
}
