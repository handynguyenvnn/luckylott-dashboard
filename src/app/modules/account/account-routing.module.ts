import { RouterModule, Routes } from '@angular/router';
import { profileRoute } from './pages/profile/profile.route';
import { passwordResetInitRoute } from './pages/password-reset/init/password-reset-init.route';
import { passwordResetFinishRoute } from './pages/password-reset/finish/password-reset-finish.route';
import { passwordRoute } from './pages/password/password.route';
import { activateRoute } from './pages/activate/activate.route';
import { NgModule } from '@angular/core';

const ACCOUNT_ROUTES = [activateRoute, passwordRoute, passwordResetFinishRoute, passwordResetInitRoute, profileRoute];

export const accountState: Routes = [
  {
    path: '',
    children: ACCOUNT_ROUTES
  }
];

@NgModule({
  imports: [RouterModule.forChild(accountState)],
  exports: [RouterModule]
})

export class AccountRoutingModule { }
