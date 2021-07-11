import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { Error1Component } from './error-1/error-1.component';
import { Error2Component } from './error-2/error-2.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        AuthenticationRoutingModule,
    ],
    declarations: [
        LoginComponent,
        SignUpComponent,
        Error1Component,
        Error2Component,
    ],
})

export class AuthenticationModule {}
