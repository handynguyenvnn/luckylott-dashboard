import {BetType} from './enumerations/bet-type.model';

export interface IGameResult {
  id?: number;
  result?: string;
  betType?: BetType;
  gameId?: number;
}

export class GameResult implements IGameResult {
  constructor(public id?: number, public result?: string, public betType?: BetType, public gameId?: number) {}
}
