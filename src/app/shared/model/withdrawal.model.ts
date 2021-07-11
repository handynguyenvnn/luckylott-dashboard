import { Moment } from 'moment';
import {WithdrawalStatusEnum} from './enumerations';

export interface IWithdrawal {
  id?: number;
  amount?: number;
  submitDate?: Moment;
  playerAddress?: string;
  actionDate?: Moment;
  withdrawalStatus?: WithdrawalStatusEnum;
  playerId?: number;
  teleName?: string;
  teleId?: number;
  note?: string;
}

export class Withdrawal implements IWithdrawal {
  constructor(
    public id?: number,
    public amount?: number,
    public submitDate?: Moment,
    public playerAddress?: string,
    public actionDate?: Moment,
    public withdrawalStatus?: WithdrawalStatusEnum,
    public playerId?: number,
    public teleName?: string,
    public teleId?: number,
    public note?: string
  ) {}
}
