export abstract class BaseRepository<T> {
  abstract get(id: number): Promise<T>;
  abstract delete(id: number): Promise<boolean>;
  abstract save(input: Partial<T>): Promise<T>;
  abstract update(input: Partial<T>): Promise<boolean>;
  abstract getList(
    skip: number,
    limit: number,
  ): Promise<{ result: T[]; total: number }>;
}
