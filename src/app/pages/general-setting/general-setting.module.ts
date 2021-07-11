import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralSettingListComponent } from './general-setting-list/general-setting-list.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {generalSettingRoute} from './general-setting.route';
import {NzNotificationModule} from 'ng-zorro-antd';

@NgModule({
  declarations: [GeneralSettingListComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(generalSettingRoute), NzNotificationModule ],
})
export class GeneralSettingModule { }
