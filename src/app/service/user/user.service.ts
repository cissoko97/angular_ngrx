import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { IUser } from 'app/models';

@Injectable({
  providedIn: 'root'
})
export class UserService extends EntityCollectionServiceBase<IUser> {

  constructor(serviceElementFactory: EntityCollectionServiceElementsFactory) {
    super('User', serviceElementFactory)
  }
}
