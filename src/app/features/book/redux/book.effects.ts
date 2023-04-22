import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IBook } from 'app/core/models';
import { mergeMap, of, map, catchError, EMPTY } from 'rxjs';
import { bookActions } from './book.actions';



@Injectable()
export class BookEffects {

  actions$ = inject(Actions);

  loadUserSucces$ = createEffect(() => this.actions$.pipe(
    ofType(bookActions.loadBook),
    mergeMap(() => of(books)
      .pipe(
        map(books => bookActions.loadBookSuccess({ books })),
        catchError(() => EMPTY)
      ))
  ));

}


const books: IBook[] = [
  {
    uuid: `MAX1`,
    title: 'Fat Cry 3',
    description: 'description',
    totalChapter: 2
  }
];
