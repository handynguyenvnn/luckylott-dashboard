export interface IAgentPwd {
  login?: string;
  newPassword?: string;
}

export class AgentPwd implements IAgentPwd {
  constructor(
    public login?: string,
    public newPassword?: string,
  ) {}
}
