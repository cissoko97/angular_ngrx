import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  user: {},
  book: {}
};

const pluralNames = { user: 'users', book: 'books' };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
