import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {MessageComponent} from './message.component';
import {messageRoute} from './message.route';
import {NzUploadModule} from 'ng-zorro-antd';

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(messageRoute), NzUploadModule ],
  declarations: [MessageComponent],
})
export class MessageModule { }
