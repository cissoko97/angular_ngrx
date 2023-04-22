import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ListUserComponent } from './list-user/list-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../../shared/shared.module';
import { UserEffects } from './redux/user.effects';
import { userReducer } from './redux';
import { keyWord } from 'app/core/utils/storeKey';


@NgModule({
  declarations: [
    ListUserComponent,
    AddUserComponent
  ],
  imports: [
    EffectsModule.forFeature([UserEffects]),
    StoreModule.forFeature(keyWord.USERSTORE, userReducer),
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
