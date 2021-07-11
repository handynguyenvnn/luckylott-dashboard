export interface IHaraAuth {
  code?: string;
  idToken?: string;
  scope?: string;
  sessionState?: string;
}

export class HaraAuth implements IHaraAuth {
  constructor(
    public code?: string,
    public idToken?: string,
    public scope?: string,
    public sessionState?: string
  ) {}
}
