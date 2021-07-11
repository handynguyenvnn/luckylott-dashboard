import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportPlayersComponent } from './report-players.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { reportPlayersRouter } from './report-players.route';

@NgModule({
  declarations: [ReportPlayersComponent],
  imports: [SharedModule, RouterModule.forChild(reportPlayersRouter)],
})
export class ReportPlayersModule { }
