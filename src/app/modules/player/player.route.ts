import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserRouteAccessService} from '../../core';
import {ResolvePagingParams} from '../../core/services';
import {Authority} from '../../shared/constants/authority.constants';
import { PlayerComponent } from './player.component';
import {PlayerCreditComponent} from './player-credit/player-credit.component';

export const playerRouter: Routes = [
  {
    path: '',
    canActivate: [UserRouteAccessService],
    component: PlayerComponent,
    data: {
      authorities: [Authority.ADMIN, Authority.CS],
      defaultSort: 'id,desc',
      headerDisplay: 'none',
    },
    resolve: {
      pagingParams: ResolvePagingParams,
    },
  },
  {
    path: ':id/credits',
    canActivate: [UserRouteAccessService],
    component: PlayerCreditComponent,
    data: {
      authorities: [Authority.ADMIN, Authority.CS],
      defaultSort: 'id,desc',
      headerDisplay: 'none',
    },
    resolve: {
      pagingParams: ResolvePagingParams,
    },
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(playerRouter)],
})
export class PlayerRouterModule {
}
