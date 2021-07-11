import { Routes, RouterModule } from '@angular/router';

export const FullHeaderLayout_ROUTES: Routes = [
  {
    path: 'agent-info',
    loadChildren: () => import('../../modules/agent-info/agent-info.module').then((m) => m.AgentInfoModule),
  }
];
