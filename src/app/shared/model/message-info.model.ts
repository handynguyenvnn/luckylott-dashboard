export interface IMessageInfo {
  id?: number;
  teleId?: string;
  messageId?: string;
  action?: string;
}

export class MessageInfo implements IMessageInfo {
  constructor(public id?: number, public teleId?: string, public messageId?: string, public action?: string) {}
}
