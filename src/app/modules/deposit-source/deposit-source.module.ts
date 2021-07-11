import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { depositSourceRoute } from './deposit-source.route';
import {SharedModule} from '../../shared/shared.module';
import {DepositSourceComponent} from './deposit-source.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(depositSourceRoute)],
  declarations: [DepositSourceComponent],
})
export class DepositSourceModule {}
