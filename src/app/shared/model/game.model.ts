import { Moment } from 'moment';
import {IGameResult} from './game-result.model';
import {GameStatus} from './enumerations/game-status.model';

export interface IGame {
  id?: number;
  gameCode?: string;
  drawDate?: Moment;
  closeDate?: Moment;
  drawDateString?: string;
  closeDateString?: string;
  gameResult?: string;
  gameStatus?: GameStatus;
  gameResults?: IGameResult[];
  poolId?: number;
  poolName?: string;
}

export class Game implements IGame {
  constructor(
    public id?: number,
    public gameCode?: string,
    public drawDate?: Moment,
    public closeDate?: Moment,
    public drawDateString?: string,
    public closeDateString?: string,
    public gameStatus?: GameStatus,
    public gameResult?: string,
    public gameResults?: IGameResult[],
    public poolId?: number,
    public poolName?: string
  ) {}
}

