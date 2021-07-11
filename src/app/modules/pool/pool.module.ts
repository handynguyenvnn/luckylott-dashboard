import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoolComponent } from './pool.component';
import { PoolRouterModule } from './pool.route';
import {SharedModule} from '../../shared/shared.module';
import { PoolUpdateComponent } from 'src/app/modules/pool/pool-update/pool-update.component';
import { PoolRewardsComponent } from './pool-rewards/pool-rewards.component';
import { PoolRewardUpdateComponent } from './pool-reward-update/pool-reward-update.component';
import { SettingPoolComponent } from './setting-pool/setting-pool.component';

@NgModule({
  declarations: [
    PoolComponent,
    PoolUpdateComponent,
    PoolRewardsComponent,
    PoolRewardUpdateComponent,
    SettingPoolComponent
  ],
  entryComponents: [
    PoolUpdateComponent,
    PoolRewardUpdateComponent,
    SettingPoolComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PoolRouterModule
  ]
})
export class PoolModule { }
