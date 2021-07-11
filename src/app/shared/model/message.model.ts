export interface IMessage {
  ids?: string;
  message?: string;
}

export class Message implements IMessage {
  constructor(public ids?: string, public message?: string) {}
}
