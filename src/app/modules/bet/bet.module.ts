import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BetComponent } from './bet.component';
import { betRoute } from './bet.route';
import {SharedModule} from '../../shared/shared.module';
import {NzDatePickerModule} from 'ng-zorro-antd';
import { BetHistoryComponent } from './bet-history/bet-history.component';
import { UpdateBetComponent } from './update-bet/update-bet.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(betRoute),
    NzDatePickerModule
  ],
  declarations: [
    BetComponent, 
    BetHistoryComponent,
    UpdateBetComponent
  ],
  entryComponents: [
    UpdateBetComponent
  ]
})
export class BetModule {}
