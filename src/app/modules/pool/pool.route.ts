import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserRouteAccessService} from '../../core';
import {ResolvePagingParams} from '../../core/services';
import {Authority} from '../../shared/constants/authority.constants';
import { PoolComponent } from './pool.component';

export const poolRouter: Routes = [
  {
    path: '',
    canActivate: [UserRouteAccessService],
    component: PoolComponent,
    data: {
      authorities: [Authority.ADMIN, Authority.CS],
      defaultSort: 'id,desc',
      headerDisplay: 'none',
    },
    resolve: {
      pagingParams: ResolvePagingParams,
    },
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(poolRouter)],
})
export class PoolRouterModule {
}
