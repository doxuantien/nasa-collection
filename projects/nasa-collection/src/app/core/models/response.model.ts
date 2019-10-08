import { CollectionModel } from './collection.model';

export interface ResponseModel<T> {
  collection: CollectionModel<T>;
}
