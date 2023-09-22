import { isArray, isObject } from './type'
import { hasOwn } from './object'

// interface Obj {
//     [key: number]: any
//     [key: string]: any
// }

/**
 * 循环对象和数组
 * @param obj 对象或者数组
 * @param fn 回调函数
 */
export function forEach<T = Record<number | string, any>>(
    obj: T,
    fn: (value: any, index?: number | string, obj?: T) => void
): void {
    if (isArray(obj)) {
        // Iterate over array values
        for (let i = 0, l = obj.length; i < l; i++) {
            fn.call(null, obj[i], i, obj)
        }
    } else if (isObject(obj)) {
        // Iterate over object keys
        for (const key in obj) {
            if (hasOwn(obj, key)) {
                fn.call(null, obj[key], key, obj)
            }
        }
    }
}
