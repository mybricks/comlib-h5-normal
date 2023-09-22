import { isBoolean, isArray, isObject } from './type'
import { forEach } from './interator'

/**
 * 深拷贝
 * @param deep 是否是深度拷贝
 * @param target 目标对象
 * @param sources 多个源对象
 * @returns target 目标对象
 */
export function merge(deep: boolean, target: any, ...sources: unknown[]): any

/**
 * 浅拷贝
 * @param target 目标对象
 * @param sources 多个源对象
 * @returns target 目标对象
 */
export function merge(target: any, ...sources: unknown[]): any

/**
 * 合并多个对象
 * @param targetOrDeep 目标对象或者是否深度合并
 * @param sources 多个源对象
 * @returns target 目标对象
 */
export function merge(
    targetOrDeep: boolean | Record<string | number, any>,
    ...sources: unknown[]
): Record<string | number, any> {
    let deep: boolean
    let target: any

    if (isBoolean(targetOrDeep)) {
        deep = targetOrDeep
        target = sources.shift()
    } else {
        target = targetOrDeep
    }
    forEach(sources, (source: unknown) => {
        forEach(source, (value, key) => {
            if (deep && (isArray(value) || isObject(value))) {
                if (isArray(value)) {
                    if (!isArray(target[key!])) {
                        target[key!] = []
                    }
                } else {
                    if (!isObject(target[key!])) {
                        target[key!] = {}
                    }
                }
                merge(deep, target[key!], value)
            } else {
                target[key!] = value
            }
        })
    })
    return target
}
