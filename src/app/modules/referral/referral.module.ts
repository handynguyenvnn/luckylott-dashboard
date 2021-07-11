import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { referralRoute } from './referral.route';
import {ReferralComponent} from './referral.component';
import {SharedModule} from '../../shared/shared.module';
import {ReferralUpdateComponent} from './referral-update/referral-update.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(referralRoute)],
  declarations: [ReferralComponent, ReferralUpdateComponent],
  entryComponents: [ReferralUpdateComponent],
})
export class ReferralModule {}
