import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  User: {},
  Villain: {}
};

const pluralNames = { User: 'users' };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
