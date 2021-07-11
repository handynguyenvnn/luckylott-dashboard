import { Routes } from '@angular/router';
import {Authority} from '../../shared/constants/authority.constants';
import {UserRouteAccessService} from '../../core';
import {MessageComponent} from './message.component';

export const messageRoute: Routes = [
  {
    path: '',
    component: MessageComponent,
    resolve: {
    },
    data: {
      authorities: [Authority.ADMIN, Authority.CS],
      title: 'Send message to users'
    },
    canActivate: [UserRouteAccessService]
  }
];
