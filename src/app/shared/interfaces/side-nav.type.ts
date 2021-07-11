import {Authority} from '../constants/authority.constants';

export interface SideNavInterface {
    path: string;
    title: string;
    authorities: string[];
    iconType: '' | 'nzIcon' | 'fontawesome';
    iconTheme: '' | 'fab' | 'far' | 'fas' | 'fill' | 'outline' | 'twotone';
    icon: string;
    submenu: SideNavInterface[];
}
