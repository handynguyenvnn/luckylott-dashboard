import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportMerchantsComponent } from './report-merchants.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { reportMerchantsRouter } from './report-merchants.route';

@NgModule({
  declarations: [ReportMerchantsComponent],
  imports: [SharedModule, RouterModule.forChild(reportMerchantsRouter)],
})
export class ReportMerchantsModule { }
