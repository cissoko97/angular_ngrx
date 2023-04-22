export enum keyWord {
  USERLOGIN = 'USER_LOGIN',
  BOOKSTORE = 'BOOKS',
  USERSTORE = 'USERS',
  AUTHSTORE = 'AUTH'
}


export interface AuthRequest {
  username: string,
  password: string,
  withRefreshToken: boolean,
  grantType: 'password' | 'refreshToken',
  refreshToken?: string,
}
