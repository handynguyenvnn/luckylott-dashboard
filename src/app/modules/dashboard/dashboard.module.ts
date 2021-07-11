import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ThemeConstantService } from '../../shared/services/theme-constant.service';
import { DefaultDashboardComponent } from './default/default-dashboard.component';
import { ProjectsDashboardComponent } from './projects/projects-dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        DashboardRoutingModule
    ],
    exports: [],
    declarations: [
        DefaultDashboardComponent,
        ProjectsDashboardComponent
    ],
    providers: [
        ThemeConstantService
    ],
})
export class DashboardModule { }
