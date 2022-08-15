import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { bookActions } from '../state/book.actions';
import { BookState } from '../state/book.reducer';
import { selectBooks } from '../state/book.selectors';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {

  store = inject(Store) as Store<BookState>;

  books$ = this.store.select(selectBooks);

  constructor() { }

  ngOnInit(): void {
    this.store.dispatch(bookActions.loadBook())
  }

}
