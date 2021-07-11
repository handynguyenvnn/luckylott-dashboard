import { Routes } from '@angular/router';
import {UserRouteAccessService} from '../../core';
import {Authority} from '../../shared/constants/authority.constants';
import {AgentInfoComponent} from './agent-info.component';
import {ResolvePagingParams} from '../../core/services';
import {AgentReportComponent} from './agent-report/agent-report.component';

export const agentInfoRoute: Routes = [
  {
    path: '',
    component: AgentInfoComponent,
    data: {
      authorities: [Authority.AGENT],
      defaultSort: 'id,desc',
    },
    resolve: {
      pagingParams: ResolvePagingParams,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'report',
    component: AgentReportComponent,
    data: {
      authorities: [Authority.AGENT],
      defaultSort: 'id,desc',
    },
    resolve: {
      pagingParams: ResolvePagingParams,
    },
    canActivate: [UserRouteAccessService],
  },
];
