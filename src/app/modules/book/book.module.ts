import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { AddBookComponent } from './add-book/add-book.component';
import { ListBookComponent } from './list-book/list-book.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AddBookComponent,
    ListBookComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    SharedModule,
  ]
})
export class BookModule { }
