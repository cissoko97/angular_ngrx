import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthRequest } from 'app/core/models';
import { AuthState } from 'app/features/authentication/redux';
import { getAccesToken } from 'app/features/authentication/redux/authentication.selectors';
import { environment } from 'environments/environment';
import { Observable, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  store = inject(Store) as Store<AuthState>;


  private httpClient: HttpClient = inject(HttpClient);


  login(payload: AuthRequest): Observable<{ accessToken: string, refreshToken: string }> {
    return this.httpClient.post<{ accessToken: string, refreshToken: string }>(`${environment.url}auth/token`, payload);
  }


  public hasRole(userRoles: Array<string> | string): Observable<boolean> {
    return this.store.select(getAccesToken).pipe(
      map((token: string) => {
        const dehash = atob(token.split('.')[1]) as string;

        const claim: { roles: Array<string> } = JSON.parse(dehash);

        return claim.roles.some(role => userRoles.includes(role))
      })
    );
  }
}
