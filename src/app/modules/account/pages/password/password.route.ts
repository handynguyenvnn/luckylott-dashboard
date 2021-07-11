import { Route } from '@angular/router';
import { PasswordComponent } from './password.component';
import { UserRouteAccessService } from '../../../../core';

export const passwordRoute: Route = {
  path: 'password',
  component: PasswordComponent,
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'global.menu.account.password'
  },
  canActivate: [UserRouteAccessService]
};
