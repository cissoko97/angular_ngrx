export interface AuthRequest {
  username: string,
  password: string,
  withRefreshToken: boolean,
  grantType: 'password' | 'refreshToken',
  refreshToken?: string,
}
