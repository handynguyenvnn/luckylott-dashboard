import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { withdrawalRoute } from './withdrawal.route';
import {SharedModule} from '../../shared/shared.module';
import {WithdrawalComponent} from './withdrawal.component';
import { UpdateWithdrawalComponent } from './update-withdrawal/update-withdrawal.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(withdrawalRoute)],
  declarations: [WithdrawalComponent, UpdateWithdrawalComponent],
  entryComponents: [UpdateWithdrawalComponent],
})
export class WithdrawalModule {}
