import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { bookActions } from '../redux/book.actions';
import { BookState } from '../redux/book.reducer';
import { selectBooks } from '../redux/book.selectors';

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
