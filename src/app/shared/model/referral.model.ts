export interface IReferral {
  id?: number;
  code?: string;
  teleId?: number;
}

export class Referral implements IReferral {
  constructor(public id?: number, public code?: string, public teleId?: number) {}
}
