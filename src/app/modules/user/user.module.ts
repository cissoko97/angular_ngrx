import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ListUserComponent } from './list-user/list-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from 'app/effects/user.effects';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ListUserComponent,
    AddUserComponent
  ],
  imports: [
    EffectsModule.forFeature([UserEffects]),
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
