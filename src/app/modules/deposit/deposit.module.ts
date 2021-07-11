import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DepositComponent } from './deposit.component';
import { depositRoute } from './deposit.route';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(depositRoute)],
  declarations: [DepositComponent],
})
export class DepositModule {}
