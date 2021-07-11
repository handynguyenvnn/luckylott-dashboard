import { Routes } from '@angular/router';
import { BetComponent } from './bet.component';
import {Authority} from '../../shared/constants/authority.constants';
import {UserRouteAccessService} from '../../core';
import {ResolvePagingParams} from '../../core/services';
import { BetHistoryComponent } from './bet-history/bet-history.component';

export const betRoute: Routes = [
  {
    path: '',
    component: BetComponent,
    data: {
      authorities: [Authority.ADMIN, Authority.CS],
      defaultSort: 'betDate,asc',
      headerDisplay: 'none',
    },
    canActivate: [UserRouteAccessService],
    resolve: {
      pagingParams: ResolvePagingParams,
    },
  },
  {
    path: ':id/history',
    component: BetHistoryComponent,
    data: {
      authorities: [Authority.ADMIN, Authority.CS],
      defaultSort: 'id,asc',
      headerDisplay: 'none',
    },
    canActivate: [UserRouteAccessService],
    resolve: {
      pagingParams: ResolvePagingParams,
    },
  },
];
