import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {NgxSpinnerModule} from 'ngx-spinner';
import {TemplateModule} from './shared/template/template.module';
import {en_US, NgZorroAntdModule, NZ_I18N} from 'ng-zorro-antd';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FullLayoutComponent} from './layouts/full-layout/full-layout.component';
import {CommonLayoutComponent} from './layouts/common-layout/common-layout.component';
import {CoreModule} from './core';
import {ThemeConstantService} from './shared/services/theme-constant.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './core/interceptors/auth.interceptor';
import {NotificationInterceptor} from './core/interceptors/notification.interceptor';
import {AuthExpiredInterceptor} from './core/interceptors/auth-expired.interceptor';
import {ErrorHandlerInterceptor} from './core/interceptors/errorhandler.interceptor';
import {AccountModule} from './modules/account/account.module';
import {PagesModule} from './pages/pages.module';
import { GameModule } from './modules/game/game.module';
import { WalletAddressModule } from './modules/wallet-address/wallet-address.module';
import { PlayerModule } from './modules/player/player.module';
import {ReferralModule} from './modules/referral/referral.module';
import {WithdrawalModule} from './modules/withdrawal/withdrawal.module';
import {BetModule} from './modules/bet/bet.module';
import {DepositModule} from './modules/deposit/deposit.module';
import {AgentModule} from './modules/agent/agent.module';
import {AgentInfoModule} from './modules/agent-info/agent-info.module';
import {FullHeaderLayoutComponent} from './layouts/full-header-layout/full-header-layout.component';
import { ReportBetsModule } from './modules/report-bets/report-bets.module';
import { ReportMerchantsModule } from './modules/report-merchants/report-merchants.module';
import { ReportPlayersModule } from './modules/report-players/report-players.module';
import {DepositSourceModule} from './modules/deposit-source/deposit-source.module';

@NgModule({
  declarations: [
    AppComponent,
    CommonLayoutComponent,
    FullLayoutComponent,
    FullHeaderLayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    AppRoutingModule,
    TemplateModule,
    SharedModule,
    NgxSpinnerModule,
    NgxWebstorageModule.forRoot({ prefix: 'coin', separator: '-' }),
    CoreModule,
    AccountModule,
    PagesModule,
    GameModule,
    WalletAddressModule,
    PlayerModule,
    ReferralModule,
    WithdrawalModule,
    BetModule,
    DepositModule,
    AgentModule,
    AgentInfoModule,
    ReportBetsModule,
    ReportPlayersModule,
    ReportMerchantsModule,
    DepositSourceModule
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: en_US,
    },
    ThemeConstantService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
