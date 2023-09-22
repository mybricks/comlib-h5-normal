import { toArray } from './array'

export function noop(..._args: unknown[]): any
/**
 * 空函数
 */
// tslint:disable-next-line
export function noop(): void {}

/**
 * 防抖函数
 * @param fn 执行函数
 * @param delay 延迟时间
 * @returns 防抖函数
 */
export function debounce(fn: (...args: unknown[]) => any, delay = 200) {
    let timer: any
    return function(this: any) {
        const args = arguments

        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, toArray(args))
        }, delay)
        return timer
    } as (...args: unknown[]) => NodeJS.Timeout
}

/**
 * 节流函数
 * @param fn 执行函数
 * @param delay: 延迟时间
 * @returns 节流函数
 */
export function throttle(fn: (...args: unknown[]) => any, delay = 200) {
    let timer: any
    return function(this: any) {
        if (timer) {
            return
        }

        const args = arguments
        timer = setTimeout(() => {
            fn.apply(this, toArray(args))
            timer = null
        }, delay)
        return timer
    } as (...args: unknown[]) => NodeJS.Timeout
}

/**
 * 缓存函数结果
 * @param fn
 * @returns function
 */
export function cached<T>(fn: (value: string) => T): (value: string) => T {
    // create no prototype object
    const cache = Object.create(null)
    return function cachedFn(value: string) {
        const hit = cache[value]
        return hit || (cache[value] = fn(value))
    }
}
