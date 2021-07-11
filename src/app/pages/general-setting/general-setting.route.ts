import { Routes } from '@angular/router';
import {ResolvePagingParams} from '../../core/services';
import {Authority} from '../../shared/constants/authority.constants';
import {UserRouteAccessService} from '../../core';
import {GeneralSettingListComponent} from './general-setting-list/general-setting-list.component';

export const generalSettingRoute: Routes = [
  {
    path: '',
    component: GeneralSettingListComponent,
    resolve: {
    },
    data: {
      authorities: [Authority.ADMIN, Authority.CS],
      title: 'General Setting'
    },
    canActivate: [UserRouteAccessService]
  }
];
