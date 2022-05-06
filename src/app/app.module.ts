import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { AppComponent } from './app.component';
import { userReducer } from './reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { userEffects } from './effects';

const routes: Routes = [
  { path: 'book', loadChildren: () => import('./features/book/book.module').then(m => m.BookModule) }
];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ users: userReducer.userReducer }),
    RouterModule.forRoot(routes),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: true }),
    EffectsModule.forRoot([userEffects.UserEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
