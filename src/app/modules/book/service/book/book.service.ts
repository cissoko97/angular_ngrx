import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { IBook } from 'app/models';

@Injectable()
export class BookService extends EntityCollectionServiceBase<IBook> {

  constructor(serviceElementFactory: EntityCollectionServiceElementsFactory) {
    super('book', serviceElementFactory)
  }
}
