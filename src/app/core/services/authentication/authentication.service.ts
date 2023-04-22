import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthRequest } from 'app/core/utils/storeKey';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private httpClient: HttpClient = inject(HttpClient);


  login(payload: AuthRequest): Observable<{ accessToken: string, refreshToken: string }> {
    return this.httpClient.post<{ accessToken: string, refreshToken: string }>(`${environment.url}auth/token`, payload);
  }

}
