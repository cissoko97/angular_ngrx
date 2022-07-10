import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUser } from 'app/models/user.model';

export const AuthAction = createActionGroup({
  source: 'AUTHENTICATION',
  events: {
    'register': props<{ user: IUser }>(),
    'register Success': emptyProps(),
    'register Failed': emptyProps(),
    'login': props<{ login: string, password: string }>(),
    'login Success': props<{ login: string, password: string }>(),
    'login Failed': emptyProps(),
    'log Out': emptyProps(),
  }
})
