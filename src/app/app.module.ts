import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import {
  HttpClientModule,
} from "@angular/common/http";
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HydratationEffects } from './effects';
import { environment } from 'environments/environment';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthenticationModule } from './modules/authentication/authentication.module';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'book',
    loadChildren: () => import('./modules/book/book.module').then(m => m.BookModule)
  },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MatDialogModule,
    HttpClientModule,
    // StoreModule.forRoot({ users: userReducer.userReducer }),
    StoreModule.forRoot({}, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictActionSerializability: true,
        strictActionTypeUniqueness: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 30, logOnly: environment.production, autoPause: true }),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    BrowserAnimationsModule,
    StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
    EffectsModule.forRoot([HydratationEffects]),
    // AuthenticationModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { hasBackdrop: true, disableClose: true }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
