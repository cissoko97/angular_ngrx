import { createFeatureSelector, createSelector } from '@ngrx/store';
import { keyWord } from 'app/utils/storeKey';
import { BookState } from './book.reducer';

export const selectBookStore = createFeatureSelector<BookState>(keyWord.BOOKSTORE);


export const selectBooks = createSelector(
  selectBookStore,
  (s1: BookState) => {
    return s1.books
  }
);
