import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { userReducer } from './reducer';
import { UsersResolver } from './resolver/users.resolver';

const routes: Routes = [
  { path: 'book', loadChildren: () => import('./features/book/book.module').then(m => m.BookModule) }
];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ users: userReducer.userReducer }),
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
