export interface IBetGroup {
  teleId?: number;
  teleName?: string;
  betWinLose?: string;
  betAmount?: number;
  playerId?: number;
}

export class BetGroup implements IBetGroup {
  constructor(
  public teleId?: number,
  public teleName?: string,
  public betWinLose?: string,
  public betAmount?: number,
  public playerId?: number,
  ) {}
}
