import {IAgent} from './agent.model';

export interface IAgentReport {
  merchant?: IAgent;
  totalUser?: number;
  betAmount?: number;
  commissionAmount?: number;
}

export class AgentReport implements IAgentReport {
  constructor(
    public merchant?: IAgent,
    public totalUser?: number,
    public betAmount?: number,
    public commissionAmount?: number
  ) {}
}
