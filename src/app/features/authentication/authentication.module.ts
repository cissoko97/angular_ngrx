import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../../shared/shared.module';
import { authReducer } from './redux';
import { StoreModule } from '@ngrx/store';
import { AuthenticationEffects } from './redux/authentication.effects';
import { keyWord } from 'app/core/utils/storeKey';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule,
    StoreModule.forFeature(keyWord.AUTHSTORE, authReducer),
    EffectsModule.forFeature([AuthenticationEffects])
  ],
})
export class AuthenticationModule {
}
