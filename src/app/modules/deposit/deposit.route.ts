import {Routes} from '@angular/router';
import {DepositComponent} from './deposit.component';
import {Authority} from '../../shared/constants/authority.constants';
import {UserRouteAccessService} from '../../core';
import {ResolvePagingParams} from '../../core/services';

export const depositRoute: Routes = [
  {
    path: '',
    component: DepositComponent,
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
