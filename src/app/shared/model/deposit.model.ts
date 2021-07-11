export interface IDeposit {
  id?: number;
  address?: string;
  txnId?: string;
  amount?: number;
  depositId?: string;
  statusCode?: string;
  statusText?: string;
}

export class Deposit implements IDeposit {
  constructor(
    public id?: number,
    public address?: string,
    public txnId?: string,
    public amount?: number,
    public depositId?: string,
    public statusCode?: string,
    public statusText?: string
  ) {}
}
