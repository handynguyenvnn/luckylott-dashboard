import {CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import { WalletAddressRouterModule } from './wallet-address.route';
import { WalletAddressComponent } from './wallet-address.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    WalletAddressRouterModule,
  ],
  declarations: [WalletAddressComponent],
})
export class WalletAddressModule {}
