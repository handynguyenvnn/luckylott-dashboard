import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { agentInfoRoute } from './agent-info.route';
import {SharedModule} from '../../shared/shared.module';
import {AgentInfoComponent} from './agent-info.component';
import {NzMenuModule} from 'ng-zorro-antd';
import { AgentReportComponent } from './agent-report/agent-report.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(agentInfoRoute), NzMenuModule],
  declarations: [AgentInfoComponent, AgentReportComponent],
})
export class AgentInfoModule {}
