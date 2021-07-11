import { Routes } from '@angular/router';
import {MessageOutComponent} from './message-out.component';
import {Authority} from '../../shared/constants/authority.constants';
import {UserRouteAccessService} from '../../core';
import {ResolvePagingParams} from '../../core/services';

export const messageInfoRoute: Routes = [
  {
    path: '',
    component: MessageOutComponent,
    data: {
      authorities: [Authority.ADMIN, Authority.CS],
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
    resolve: {
      pagingParams: ResolvePagingParams,
    },
  },
];
