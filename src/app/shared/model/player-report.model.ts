export interface IPlayerReport {
  credit?: number;
  balance?: number;
  lose?: number;
  win?: number;
  withdraw?: number;
  betAmount?: number;
  id?: number;
  teleName?: string;
  teleId?: string;
  winLose?: number;
}

export class PlayerReport implements IPlayerReport {
  constructor(
    public credit?: number,
    public balance?: number,
    public lose?: number,
    public win?: number,
    public withdraw?: number,
    public betAmount?: number,
    public id?: number,
    public teleName?: string,
    public teleId?: string,
    public winLose?: number,
  ) {}
}
