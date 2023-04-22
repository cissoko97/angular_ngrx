import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { AddBookComponent } from './add-book/add-book.component';
import { ListBookComponent } from './list-book/list-book.component';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { keyWord } from 'app/core/utils/storeKey';
import * as fromBook from './redux/book.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BookEffects } from './redux/book.effects';


@NgModule({
  declarations: [
    AddBookComponent,
    ListBookComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    SharedModule,
    StoreModule.forFeature(keyWord.BOOKSTORE, fromBook.reducer),
    EffectsModule.forFeature([BookEffects]),
  ]
})
export class BookModule { }
