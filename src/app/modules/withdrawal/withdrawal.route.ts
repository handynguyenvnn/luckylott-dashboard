import {Routes} from '@angular/router';
import {WithdrawalComponent} from './withdrawal.component';
import {UserRouteAccessService} from '../../core';
import {Authority} from '../../shared/constants/authority.constants';
import {ResolvePagingParams} from '../../core/services';

export const withdrawalRoute: Routes = [
  {
    path: '',
    component: WithdrawalComponent,
    data: {
      authorities: [Authority.ADMIN, Authority.CS],
      defaultSort: 'id,desc',
      headerDisplay: 'none',
    },
    canActivate: [UserRouteAccessService],
    resolve: {
      pagingParams: ResolvePagingParams,
    },
  }
];
