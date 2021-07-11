import { Routes } from '@angular/router';
import {Authority} from '../../shared/constants/authority.constants';
import {UserRouteAccessService} from '../../core';
import { DeleteMessageComponent } from './delete-message.component';

export const deleteMessageRoute: Routes = [
  {
    path: '',
    component: DeleteMessageComponent,
    resolve: {
    },
    data: {
      authorities: [Authority.ADMIN, Authority.CS],
      title: 'Delete message'
    },
    canActivate: [UserRouteAccessService]
  }
];
