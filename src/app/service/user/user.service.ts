import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { IUser } from 'app/models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends EntityCollectionServiceBase<IUser> {

  constructor(serviceElementFactory: EntityCollectionServiceElementsFactory) {
    super('user', serviceElementFactory)
  }

  login(params: { login: String, password: string }): Observable<any> {
    return of(params);
  }

  register(params: Partial<IUser>): Observable<Partial<IUser>> {
    return of(params);
  }
}
