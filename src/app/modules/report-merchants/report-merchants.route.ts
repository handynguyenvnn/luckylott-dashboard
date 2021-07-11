import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserRouteAccessService} from '../../core';
import {ResolvePagingParams} from '../../core/services';
import {Authority} from '../../shared/constants/authority.constants';
import { ReportMerchantsComponent } from './report-merchants.component';

export const reportMerchantsRouter: Routes = [
  {
    path: '',
    canActivate: [UserRouteAccessService],
    component: ReportMerchantsComponent,
    data: {
      authorities: [Authority.ADMIN, Authority.CS],
      defaultSort: 'id,asc',
      headerDisplay: 'none',
    },
    resolve: {
      pagingParams: ResolvePagingParams,
    },
  },
];
