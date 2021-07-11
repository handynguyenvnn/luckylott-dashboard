import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ActivateComponent } from './pages/activate/activate.component';
import { AccountRoutingModule } from './account-routing.module';
import { PasswordComponent } from './pages/password/password.component';
import { PasswordStrengthBarComponent } from './pages/password/password-strength-bar.component';
import { PasswordResetInitComponent } from './pages/password-reset/init/password-reset-init.component';
import { PasswordResetFinishComponent } from './pages/password-reset/finish/password-reset-finish.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {SharedModule} from '../../shared/shared.module';
import {ThemeConstantService} from '../../shared/services/theme-constant.service';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule
  ],
  declarations: [
    ActivateComponent,
    PasswordComponent,
    PasswordStrengthBarComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    ProfileComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    ThemeConstantService
  ],
})
export class AccountModule {}
