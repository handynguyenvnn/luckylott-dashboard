export interface IMessageOut {
  teleId?: string;
  messageId?: string;
}

export class MessageOut implements IMessageOut {
  constructor(public teleId?: string, public messageId?: string) {}
}
