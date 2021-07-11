import {Routes} from '@angular/router';
import {Authority} from '../../shared/constants/authority.constants';
import {UserRouteAccessService} from '../../core';
import {ResolvePagingParams} from '../../core/services';
import {DepositSourceComponent} from './deposit-source.component';

export const depositSourceRoute: Routes = [
  {
    path: '',
    component: DepositSourceComponent,
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
