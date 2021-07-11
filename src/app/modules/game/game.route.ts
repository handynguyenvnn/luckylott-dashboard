import {Injectable, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserRouteAccessService} from '../../core';
import {ResolvePagingParams} from '../../core/services';
import {Authority} from '../../shared/constants/authority.constants';
import { GameComponent } from './game.component';

export const gameRoute: Routes = [
  {
    canActivate: [UserRouteAccessService],
    component: GameComponent,
    data: {
      authorities: [Authority.ADMIN, Authority.CS],
      defaultSort: 'id,asc',
      headerDisplay: 'none',
    },
    path: '',
    resolve: {
      pagingParams: ResolvePagingParams,
    },
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(gameRoute)],
})
export class GameRouteModule {
}
