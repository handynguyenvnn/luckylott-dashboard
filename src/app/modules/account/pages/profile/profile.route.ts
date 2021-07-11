import { Route, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { UserRouteAccessService } from '../../../../core';

export const profileRoute: Route = {
  path: 'profile',
  component: ProfileComponent,
  data: {
    authorities: ['ROLE_USER', 'ROLE_AGENT'],
    title: 'Profile',
    headerDisplay: 'none'
  },
  canActivate: [UserRouteAccessService]
};
