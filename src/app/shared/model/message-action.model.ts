export interface IMessageAction {
  action?: string;
}

export class MessageAction implements IMessageAction {
  constructor(public action?: string) {}
}
