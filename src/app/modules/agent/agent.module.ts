import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { agentRoute } from './agent.route';
import {SharedModule} from '../../shared/shared.module';
import {AgentComponent} from './agent.component';
import { AgentUpdateComponent } from './agent-update/agent-update.component';
import { AgentUpdatePwdComponent } from './agent-update-pwd/agent-update-pwd.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(agentRoute)],
  declarations: [AgentComponent, AgentUpdateComponent, AgentUpdatePwdComponent],
  entryComponents: [AgentUpdateComponent, AgentUpdatePwdComponent],
})
export class AgentModule {}
