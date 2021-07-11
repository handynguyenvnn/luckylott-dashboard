import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { deleteMessageRoute } from './delete-by-action.route';
import { NzNotificationModule } from 'ng-zorro-antd';
import {DeleteByActionComponent} from './delete-by-action.component';

@NgModule({
  declarations: [DeleteByActionComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(deleteMessageRoute), NzNotificationModule ],
})
export class DeleteByActionModule { }
