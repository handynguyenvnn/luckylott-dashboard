import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportBetsComponent } from './report-bets.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { reportBetsRouter } from './report-bets.route';

@NgModule({
  declarations: [ReportBetsComponent],
  imports: [SharedModule, RouterModule.forChild(reportBetsRouter)],
})
export class ReportBetsModule { }
