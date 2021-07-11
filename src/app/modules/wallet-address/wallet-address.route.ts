import {Injectable, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserRouteAccessService} from '../../core';
import {ResolvePagingParams} from '../../core/services';
import {Authority} from '../../shared/constants/authority.constants';
import { WalletAddressComponent } from './wallet-address.component';

export const walletAddress: Routes = [
  {
    canActivate: [UserRouteAccessService],
    component: WalletAddressComponent,
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
  imports: [RouterModule.forChild(walletAddress)],
})
export class WalletAddressRouterModule {
}
