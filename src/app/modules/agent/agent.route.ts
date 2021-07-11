import { Routes } from '@angular/router';
import {UserRouteAccessService} from '../../core';
import {Authority} from '../../shared/constants/authority.constants';
import {AgentComponent} from './agent.component';
import { ResolvePagingParams } from 'src/app/core/services';

export const agentRoute: Routes = [
  {
    path: '',
    component: AgentComponent,
    data: {
      authorities: [Authority.ADMIN, Authority.CS],
      defaultSort: 'id,desc',
      headerDisplay: 'none',
    },
    canActivate: [UserRouteAccessService],
    resolve: {
      pagingParams: ResolvePagingParams,
    },
  },
];
