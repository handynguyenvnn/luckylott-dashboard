export interface ISetting {
  id?: number;
  settingKey?: string;
  settingValue?: string;
}

export class Setting implements ISetting {
  constructor(public id?: number, public settingKey?: string, public settingValue?: string) {}
}
