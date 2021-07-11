import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteMessageComponent } from './delete-message.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { deleteMessageRoute } from './delete-message.route';
import { NzNotificationModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [DeleteMessageComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(deleteMessageRoute), NzNotificationModule ],
})
export class DeleteMessageModule { }
