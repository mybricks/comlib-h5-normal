/**
 * 对象是否有某个实例属性
 * @param obj 对象
 * @param key 对象的属性
 */
export function hasOwn(obj: Record<string | number, any>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

type ValueOf<T> = T[keyof T];

export function reverseKV<T extends { [key: string]: any }, K extends keyof T>(obj: T): { [V in T[K]]: K } {
  return Object.keys(obj).reduce((res, item) => {
    res[obj[item]] = item;
    return res;
  }, {} as { [V in T[K]]: K });
}
