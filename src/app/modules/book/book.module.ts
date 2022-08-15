import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { AddBookComponent } from './add-book/add-book.component';
import { ListBookComponent } from './list-book/list-book.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { keyWord } from 'app/utils/storeKey';
import * as fromBook from './state/book.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BookEffects } from './state/book.effects';
import { BookService } from './service';


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
  ], providers: [BookService]
})
export class BookModule { }
