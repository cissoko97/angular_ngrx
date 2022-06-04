import { IUser } from "app/models";

export interface AuthState {
  loggedIn: boolean,
  user?: Partial<IUser>
}
