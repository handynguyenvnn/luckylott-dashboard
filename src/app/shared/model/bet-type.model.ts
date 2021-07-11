export interface IBetType {
  id?: number;
  name?: string;
  times?: number;
}

export class BetType implements IBetType {
  constructor(public id?: number, public name?: string, public times?: number) {}
}
