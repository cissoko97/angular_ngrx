import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthRequest } from 'app/core/models';
import { containRoles } from 'app/core/utils/hasRole';
import { AuthState } from 'app/features/authentication/redux';
import { getAccesToken } from 'app/features/authentication/redux/authentication.selectors';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  store = inject(Store) as Store<AuthState>;

  private httpClient: HttpClient = inject(HttpClient);

 public login(payload: AuthRequest): Observable<{ accessToken: string, refreshToken: string }> {
    return this.httpClient.post<{ accessToken: string, refreshToken: string }>(`/api/auth/token`, payload);
  }

  public hasRole(userRoles: Array<string>): Observable<boolean> {
    return this.store.select(getAccesToken).pipe(
      map((token: string) => {
        return containRoles(token, userRoles);
      })
    );
  }
}
