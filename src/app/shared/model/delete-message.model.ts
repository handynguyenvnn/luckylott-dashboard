export interface IDeleteMessage {
  messageId?: string;
  teleId?: string;
}

export class DeleteMessage implements IDeleteMessage {
  constructor(public messageId?: string, public teleId?: string) {}
}
