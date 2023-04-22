import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUser } from 'app/core/models/user.model';

export const userActions = createActionGroup({
  source: 'USER',
  events: {
    'load user': emptyProps(),
    'load user success': props<{ users: IUser[] }>(),
    'load user failed': emptyProps(),
    'add user': props<{ user: IUser }>(),
    'add user succes': props<{ users: Partial<IUser> }>(),
    'add user failed': emptyProps(),
    'reset user list': emptyProps()
  }
})
