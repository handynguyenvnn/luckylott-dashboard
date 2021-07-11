import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SettingComponent} from './setting/setting.component';
import {Authority} from '../shared/constants/authority.constants';

const routes: Routes = [
  {
    path: 'setting',
    component: SettingComponent,
    data: {
      title: 'Setting',
      authorities: [Authority.ADMIN, Authority.CS]
    }
  },
  {
    path: 'general-settings',
    loadChildren: () => import('../pages/general-setting/general-setting.module').then(m => m.GeneralSettingModule)
  },
  {
    path: 'message',
    loadChildren: () => import('../pages/message/message.module').then(m => m.MessageModule)
  },
  {
    path: 'message-out',
    loadChildren: () => import('../pages/message-out/message-info.module').then(m => m.MessageInfoModule)
  },
  {
    path: 'delete-message',
    loadChildren: () => import('../pages/delete-message/delete-message.module').then(m => m.DeleteMessageModule)
  },
  {
    path: 'delete-by-action',
    loadChildren: () => import('../pages/delete-by-action/delete-by-action.module').then(m => m.DeleteByActionModule)
  },
  {
    path: 'prize-setting',
    loadChildren: () => import('../pages/prize-setting/prize-setting.module').then(m => m.PrizeSettingModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
