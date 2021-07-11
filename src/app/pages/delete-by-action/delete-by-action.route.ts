import { Routes } from '@angular/router';
import {Authority} from '../../shared/constants/authority.constants';
import {UserRouteAccessService} from '../../core';
import {DeleteByActionComponent} from './delete-by-action.component';

export const deleteMessageRoute: Routes = [
  {
    path: '',
    component: DeleteByActionComponent,
    resolve: {
    },
    data: {
      authorities: [Authority.ADMIN, Authority.CS],
      title: 'Delete message'
    },
    canActivate: [UserRouteAccessService]
  }
];
