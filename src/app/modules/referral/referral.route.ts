import { Routes } from '@angular/router';
import {ReferralComponent} from './referral.component';
import {Authority} from '../../shared/constants/authority.constants';
import {UserRouteAccessService} from '../../core';
import {ResolvePagingParams} from '../../core/services';

export const referralRoute: Routes = [
  {
    path: '',
    component: ReferralComponent,
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
