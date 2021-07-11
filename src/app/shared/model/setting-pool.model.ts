export interface ISettingPool {
  id?: number;
  settingValue?: string;
  settingKey?: string;
  poolId?: number;
}

export class SettingPool implements ISettingPool {
  constructor(public id?: number, public settingValue?: string, public settingKey?: string, public poolId?: number) {}
}
