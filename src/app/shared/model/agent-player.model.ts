import {Moment} from 'moment';

export interface IAgentPlayer {
  id?: number;
  teleId?: number;
  teleName?: string;
  balance?: number;
  betWinLose?: number;
  betAmount?: number;
  betWin?: number;
  joinDate?: Moment;
}

export class AgentPlayer implements IAgentPlayer {
  constructor(
    public id?: number,
    public teleId?: number,
    public teleName?: string,
    public balance?: number,
    public betWinLose?: number,
    public betAmount?: number,
    public betWin?: number,
    public joinDate?: Moment
  ) {}
}
