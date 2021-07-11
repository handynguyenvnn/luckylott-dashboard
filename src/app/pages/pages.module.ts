import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import {SettingComponent} from './setting/setting.component';
import {NzPopconfirmModule} from 'ng-zorro-antd';
import { GeneralSettingModule } from './general-setting/general-setting.module';
import {MessageModule} from './message/message.module';
import {MessageInfoModule} from './message-out/message-info.module';
import {PrizeSettingModule} from './prize-setting/prize-setting.module';

@NgModule({
    imports: [
        SharedModule,
        PagesRoutingModule,
        NzPopconfirmModule,
        ReactiveFormsModule,
        GeneralSettingModule,
        MessageModule,
        MessageInfoModule,
        PrizeSettingModule,
    ],
    declarations: [
        SettingComponent
    ],
    providers: []
})

export class PagesModule {}
