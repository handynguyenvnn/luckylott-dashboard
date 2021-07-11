import { Routes } from '@angular/router';

// tslint:disable-next-line:variable-name
export const CommonLayout_ROUTES: Routes = [

    // Dashboard
    {
      path: 'dashboard',
      loadChildren: () => import('../../modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    },
    {
      path: 'dashboard/player',
      loadChildren: () => import('../../modules/report-players/report-players.module').then(m => m.ReportPlayersModule),
    },
    {
      path: 'dashboard/bet',
      loadChildren: () => import('../../modules/report-bets/report-bets.module').then(m => m.ReportBetsModule),
    },
    {
      path: 'dashboard/agent',
      loadChildren: () => import('../../modules/report-merchants/report-merchants.module').then(m => m.ReportMerchantsModule),
    },
    {
      path: 'account',
      loadChildren: () => import('../../modules/account/account.module').then(m => m.AccountModule),
    },
    {
      path: 'game',
      loadChildren: () => import('../../modules/game/game.module').then(m => m.GameModule),
    },
    {
      path: 'wallet-address',
      loadChildren: () => import('../../modules/wallet-address/wallet-address.module').then(m => m.WalletAddressModule),
    },
    {
      path: 'players',
      loadChildren: () => import('../../modules/player/player.module').then(m => m.PlayerModule),
    },
    {
      path: 'pools',
      loadChildren: () => import('../../modules/pool/pool.module').then(m => m.PoolModule),
    },
    {
      path: 'referral',
      loadChildren: () => import('../../modules/referral/referral.module').then(m => m.ReferralModule),
    },
    {
      path: 'withdrawal',
      loadChildren: () => import('../../modules/withdrawal/withdrawal.module').then((m) => m.WithdrawalModule),
    },
    {
      path: 'bet',
      loadChildren: () => import('../../modules/bet/bet.module').then((m) => m.BetModule),
    },
    {
      path: 'deposit',
      loadChildren: () => import('../../modules/deposit/deposit.module').then((m) => m.DepositModule),
    },
    {
      path: 'deposit-source',
      loadChildren: () => import('../../modules/deposit-source/deposit-source.module').then((m) => m.DepositSourceModule),
    },
    {
      path: 'agent',
      loadChildren: () => import('../../modules/agent/agent.module').then((m) => m.AgentModule),
    },
    // Pages
    {
        path: 'pages',
        data: {
            title: 'Pages '
        },
        children: [
            {
              path: '',
              redirectTo: '/trade',
              pathMatch: 'full'
            },
            {
                path: '',
                loadChildren: () => import('../../pages/pages.module').then(m => m.PagesModule)
            },
        ]
    },
];
