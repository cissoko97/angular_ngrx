import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUser } from 'app/core/models/user.model';
import { AuthRequest } from 'app/core/utils/storeKey';

export const AuthAction = createActionGroup({
  source: 'AUTHENTICATION',
  events: {
    'register': props<{ user: IUser }>(),
    'register Success': emptyProps(),
    'register Failed': emptyProps(),
    'login': props<AuthRequest>(),
    'login Success': props<{ accessToken: string, refreshToken: string }>(),
    'login Failed': emptyProps(),
    'log Out': emptyProps(),
  }
})
