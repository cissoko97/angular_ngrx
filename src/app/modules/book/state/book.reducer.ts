import { HttpErrorResponse } from '@angular/common/http';
import { Action, createReducer, on } from '@ngrx/store';
import { IBook } from 'app/models';
import { keyWord } from 'app/utils/storeKey';
import { bookActions } from './book.actions';


export interface BookState {
  books: IBook[] | undefined,
  errors: HttpErrorResponse | Error | any,
  inProcess: boolean
}


export interface state {
  readonly [keyWord.AUTHSTORE]: BookState
}

export const initialState: BookState = {
  books: undefined,
  errors: undefined,
  inProcess: false
};

export const reducer = createReducer(
  initialState,

  on(bookActions.loadBook, (state) => {
    return { ...state, inProcess: true };
  }),
  on(bookActions.loadBookSuccess, (state, { books }) => {
    return { ...state, inProcess: false, books };
  }),
  on(bookActions.loadBookFailed, (state, { error }) => {
    return { ...state, inProcess: false, errors: error };
  })
);
