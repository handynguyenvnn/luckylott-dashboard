import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultDashboardComponent } from './default/default-dashboard.component';
import { ProjectsDashboardComponent } from './projects/projects-dashboard.component';
import {UserRouteAccessService} from '../../core';

const routes: Routes = [
    {
        path: 'default',
        component: DefaultDashboardComponent,
        data: {
            title: 'Dashboard ',
            headerDisplay: 'none',
            authorities: ['ROLE_USER'],
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'projects',
        component: ProjectsDashboardComponent,
        data: {
            title: 'Projects Dashboard ',
            headerDisplay: 'none'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule { }
