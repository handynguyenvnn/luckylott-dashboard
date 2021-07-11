export interface IDeleteActionMessage {
  action?: string;
}

export class DeleteActionMessage implements IDeleteActionMessage {
  constructor(public action?: string) {}
}
