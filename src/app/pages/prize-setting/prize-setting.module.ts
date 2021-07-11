import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {prizeSettingRoute} from './prize-setting.route';
import {NzSelectModule} from 'ng-zorro-antd';
import {PrizeSettingComponent} from './prize-setting.component';
import { BetTypePrizeUpdateComponent } from './bet-type-prize-update/bet-type-prize-update.component';

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(prizeSettingRoute), NzSelectModule ],
  declarations: [PrizeSettingComponent, BetTypePrizeUpdateComponent],
  entryComponents: [BetTypePrizeUpdateComponent],
})
export class PrizeSettingModule { }
