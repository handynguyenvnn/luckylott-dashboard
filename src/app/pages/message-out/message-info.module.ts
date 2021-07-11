import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { messageInfoRoute } from './message-info.route';
import {MessageOutComponent} from './message-out.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(messageInfoRoute)],
  declarations: [MessageOutComponent],
})
export class MessageInfoModule {}
