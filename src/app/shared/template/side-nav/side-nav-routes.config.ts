import { SideNavInterface } from '../../interfaces/side-nav.type';
import {Authority} from '../../constants/authority.constants';

export const ROUTES: SideNavInterface[] = [
    // {
    //   path: '',
    //   title: 'Dashboard',
    //   iconType: 'nzIcon',
    //   iconTheme: 'outline',
    //   authorities: [Authority.ADMIN, Authority.CS],
    //   icon: 'dashboard',
    //   submenu: [
    //     {
    //       path: '/dashboard/player',
    //       title: 'Player report',
    //       iconType: '',
    //       icon: '',
    //       iconTheme: '',
    //       authorities: [Authority.ADMIN, Authority.CS],
    //       submenu: []
    //     },
    //     {
    //       path: '/dashboard/bet',
    //       title: 'Bet report',
    //       iconType: '',
    //       icon: '',
    //       iconTheme: '',
    //       submenu: [],
    //       authorities: [Authority.ADMIN, Authority.CS],
    //     },
    //     {
    //       path: '/dashboard/agent',
    //       title: 'Agent report',
    //       iconType: '',
    //       icon: '',
    //       iconTheme: '',
    //       authorities: [Authority.ADMIN, Authority.CS],
    //       submenu: []
    //     },
    //   ]
    // },
   {
      path: '/game',
      title: 'Games',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'appstore',
      authorities: [Authority.ADMIN, Authority.CS],
      submenu: []
    },
    // {
    //   path: '/wallet-address',
    //   title: 'Wallet Addresses',
    //   iconType: 'nzIcon',
    //   iconTheme: 'outline',
    //   icon: 'wallet',
    //   authorities: [Authority.ADMIN, Authority.CS],
    //   submenu: []
    // },
    {
      path: '/players',
      title: 'Players',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'user',
      authorities: [Authority.ADMIN, Authority.CS],
      submenu: []
    },
    {
      path: '/pools',
      title: 'Pool',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'bank',
      authorities: [Authority.ADMIN, Authority.CS],
      submenu: []
    },
    // {
    //   path: '/withdrawal',
    //   title: 'Withdrawals',
    //   iconType: 'nzIcon',
    //   iconTheme: 'outline',
    //   icon: 'money-collect',
    //   authorities: [Authority.ADMIN, Authority.CS],
    //   submenu: []
    // },
    // {
    //   path: '/deposit',
    //   title: 'CoinPayment',
    //   iconType: 'nzIcon',
    //   iconTheme: 'outline',
    //   icon: 'import',
    //   authorities: [Authority.ADMIN, Authority.CS],
    //   submenu: []
    // },
    // {
    //   path: '/deposit-source',
    //   title: 'Deposits',
    //   iconType: 'nzIcon',
    //   iconTheme: 'outline',
    //   icon: 'import',
    //   authorities: [Authority.ADMIN, Authority.CS],
    //   submenu: []
    // },
    {
      path: '/bet',
      title: 'Bet',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'number',
      authorities: [Authority.ADMIN, Authority.CS],
      submenu: []
    },
    // {
    //   path: '/agent',
    //   title: 'Agent',
    //   iconType: 'nzIcon',
    //   iconTheme: 'outline',
    //   icon: 'fund',
    //   authorities: [Authority.ADMIN, Authority.CS],
    //   submenu: []
    // },
    {
      path: '/pages/setting',
      title: 'Setting',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'setting',
      authorities: [Authority.ADMIN, Authority.CS],
      submenu: []
    }
];
