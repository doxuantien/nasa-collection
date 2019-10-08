export interface CollectionModel<T> {
  metadata?: {
    total_hits: number;
  };
  items: T[];
}
