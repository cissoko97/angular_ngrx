import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import {
  HttpClientModule,
} from "@angular/common/http";
import {MatDialogModule} from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { userReducer } from './reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { userEffects } from './effects';
import { environment } from 'environments/environment';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

const routes: Routes = [
  { path: 'book', loadChildren: () => import('./features/book/book.module').then(m => m.BookModule) }
];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MatDialogModule,
    HttpClientModule,
    StoreModule.forRoot({ users: userReducer.userReducer }),
    RouterModule.forRoot(routes),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production, autoPause: true }),
    EffectsModule.forRoot([userEffects.UserEffects]),
    EntityDataModule.forRoot(entityConfig),
    BrowserAnimationsModule,
    StoreRouterConnectingModule.forRoot(),
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
