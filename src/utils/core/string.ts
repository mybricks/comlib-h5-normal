import { isEmpty } from './type'
import { cached } from './function'

/**
 * 比较两个版本
 * @param a 版本a
 * @param b 版本b
 * @returns 0：a===b，1：a>b，-1：a<b，其余异常情况均为undefined
 */
export function compareVersion(a: string, b: string): 0 | 1 | -1 | void {
    if (isEmpty(a) || isEmpty(b)) {
        return
    }
    if (a === b) {
        return 0
    }
    const sa = a.split('.')
    const sb = b.split('.')
    const min = Math.min(sa.length, sb.length)

    // loop while the components are equal
    for (let i = 0; i < min; i++) {
        const ai = parseInt(sa[i], 10)
        const bi = parseInt(sb[i], 10)

        if (isNaN(ai) || isNaN(bi)) {
            return
        }
        // A bigger than B
        if (ai > bi) {
            return 1
        }
        // B bigger than A
        if (ai < bi) {
            return -1
        }
    }
    // If one's a prefix of the other, the longer one is greater.
    // 1.2.0 > 1.2
    if (sa.length > sb.length) {
        return 1
    }
    if (sa.length < sb.length) {
        return -1
    }
}

const camelizeRE = /-(\w)/g
/**
 * 驼峰
 * @param str
 * @returns aBC
 * 例如 输入a-b-c 返回aBC
 */
export function camelize(str: string): string {
    const cache = cached(str => {
        return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
    })
    return cache(str)
}

const decamelizeRE = /([A-Z])/g
/**
 * 取消驼峰
 * @param str
 * @returns a-b-c
 * 例如 输入aBC 返回a-b-c
 */
export function decamelize(str: string): string {
    const cache = cached((str: string): string => {
        return str.replace(decamelizeRE, '-$1').toLowerCase()
    })
    return cache(str)
}
