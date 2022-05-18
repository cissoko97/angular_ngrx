import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationLoginEffects, AuthenticationRegisterEffects } from './state';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    EffectsModule.forFeature([AuthenticationLoginEffects, AuthenticationRegisterEffects])
  ]
})
export class AuthenticationModule { }
