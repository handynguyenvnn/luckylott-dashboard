import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {NgZorroAntdModule, NzBackTopModule, NzBadgeModule, NzModalModule, NzPaginationModule, NzTagModule} from 'ng-zorro-antd';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ThemeConstantService } from './services/theme-constant.service';
import { SearchPipe } from './pipes/search.pipe';
import {ItemCountComponent} from './components/item-count/item-count.component';
import {ShowErrorsComponent} from './components/show-errors/show-errors.component';
import {HasAnyAuthorityDirective} from './directives';
import {CookieModule} from 'ngx-cookie';
import {IconFilterPipe} from './pipes/iconFilter.pipe';

@NgModule({
    exports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        NgZorroAntdModule,
        ReactiveFormsModule,
        PerfectScrollbarModule,
        NzBadgeModule,
        IconFilterPipe,
        NzBackTopModule,
        NzTagModule,
        NzPaginationModule,
        SearchPipe,
        HasAnyAuthorityDirective,
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgZorroAntdModule,
        ReactiveFormsModule,
        NzTagModule,
        NzBackTopModule,
        NzBadgeModule,
        NzModalModule,
        PerfectScrollbarModule,
        CookieModule.forRoot(),
    ],
    declarations: [
        IconFilterPipe,
        SearchPipe,
        ItemCountComponent,
        ShowErrorsComponent,
        HasAnyAuthorityDirective,
    ],
    entryComponents: [],
    providers: [
        ThemeConstantService
    ]
})

export class SharedModule { }
