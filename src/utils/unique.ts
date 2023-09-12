export class Unique {
  _key: string;
  _cache: Record<string, boolean> = {};
  constructor(key = 'id') {
    this._key = key;
  }

  filter<T = any>(newList: T[] = []): T[] {
    return newList.filter((item) => {
      const id = item[this._key];
      if (!this._cache[id]) {
        this._cache[id] = true;
        return true;
      } else {
        return false;
      }
    });
  }

  clear() {
    this._cache = {};
  }
}
