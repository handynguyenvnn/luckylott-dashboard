import {AgentStatusEnum} from './enumerations/agent-status-enum.model';

export interface IAgent {
  id?: number;
  name?: string;
  code?: string;
  commission?: number;
  merchantStatus?: AgentStatusEnum;
  userLogin?: string;
  userId?: number;
  password?: string;
  activated?: string;
  activationKey?: string;
}

export class Agent implements IAgent {
  constructor(
    public id?: number,
    public name?: string,
    public code?: string,
    public commission?: number,
    public merchantStatus?: AgentStatusEnum,
    public userLogin?: string,
    public userId?: number,
    public password?: string,
    public activated?: string,
    public activationKey?: string,
  ) {}
}
