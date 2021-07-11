import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserRouteAccessService} from '../../core';
import {ResolvePagingParams} from '../../core/services';
import {Authority} from '../../shared/constants/authority.constants';
import { ReportPlayersComponent } from './report-players.component';

export const reportPlayersRouter: Routes = [
  {
    path: '',
    canActivate: [UserRouteAccessService],
    component: ReportPlayersComponent,
    data: {
      authorities: [Authority.ADMIN, Authority.CS],
      defaultSort: 'id,asc',
      headerDisplay: 'none',
    },
    resolve: {
      pagingParams: ResolvePagingParams,
    },
  }
];
