import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IBook } from 'app/core/models';

export const bookActions = createActionGroup({
  source: 'BOOK',
  events: {
    'load book': emptyProps(),
    'load book success': props<{ books: IBook[] }>(),
    'load book failed': props<{ error: HttpErrorResponse | Error | any }>(),
  }
})

