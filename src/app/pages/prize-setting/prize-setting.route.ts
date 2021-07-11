import { Routes } from '@angular/router';
import {Authority} from '../../shared/constants/authority.constants';
import {UserRouteAccessService} from '../../core';
import {PrizeSettingComponent} from './prize-setting.component';
import {ResolvePagingParams} from '../../core/services';

export const prizeSettingRoute: Routes = [
  {
    path: '',
    component: PrizeSettingComponent,
    data: {
      authorities: [Authority.ADMIN, Authority.CS],
      defaultSort: 'id,desc',
      title: 'Setting amount for prize'
    },
    canActivate: [UserRouteAccessService],
    resolve: {
      pagingParams: ResolvePagingParams,
    },
  }
];
