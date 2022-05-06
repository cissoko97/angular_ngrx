export interface CrudInterface<I, T> {
  add(t: T): void;
  remove(i: I): void;
  update(t: T): void;
}
