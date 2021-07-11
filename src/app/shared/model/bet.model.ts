import {BetType} from './enumerations/bet-type.model';
import { Moment } from 'moment';

export interface IBet {
  id?: number;
  betNumber?: string;
  win?: boolean;
  betType?: BetType;
  betAmount?: number;
  times?: number;
  playerId?: number;
  gameId?: number;
  teleName?: string;
  teleId?: string;
  createdDate?: Moment;
  gameCode?: string;
}

export class Bet implements IBet {
  constructor(
    public id?: number,
    public betNumber?: string,
    public win?: boolean,
    public betType?: BetType,
    public betAmount?: number,
    public times?: number,
    public playerId?: number,
    public teleName?: string,
    public teleId?: string,
    public gameId?: number,
    public gameCode?: string,
    public createdDate?: Moment
  ) {
    this.win = this.win || false;
  }
}
