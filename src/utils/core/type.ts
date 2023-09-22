type IsType = (value: any) => boolean

function isType(type: string): IsType {
    return value => Object.prototype.toString.call(value) === `[object ${type}]`
}

/**
 * 判断是否是未定义
 * @param value 入参cd
 * @returns true/false，undefined、null返回true
 */
export function isUndef(value: unknown): value is undefined | null {
    return value === undefined || value === null
}

/**
 * 判断是否为空 undefined、null、空字符串返回true
 * @param value 入参
 */
export function isEmpty(value: unknown): value is undefined | null | '' {
    return value === undefined || value === null || value === ''
}

/**
 * 判断是否为Number类型
 * @param value 入参
 */
export function isNumber(value: unknown): value is number {
    return isType('Number')(value)
}

/**
 * 判断是否为String类型
 * @param value 入参
 */
export function isString(value: unknown): value is string {
    return isType('String')(value)
}

/**
 * 判断是否为Error类型
 * @param value 入参
 */
export function isError(value: unknown): value is Error {
    return isType('Error')(value)
}

/**
 * 判断是否为Array类型
 * @param value 入参
 */
export function isArray(value: unknown): value is unknown[] {
    return isType('Array')(value)
}

/**
 * 判断是否为Function类型，async function为true
 * @param value 入参
 */
export function isFunction(value: unknown): value is Function {
    return typeof value === 'function'
}

/**
 * 判断是否为Date类型
 * @param value 入参
 */
export function isDate(value: unknown): value is Date {
    return isType('Date')(value)
}

/**
 * 判断是否为Boolean 类型
 * @param value 入参
 */
export function isBoolean(value: unknown): value is boolean {
    return isType('Boolean')(value)
}

/**
 * 判断是否为严格Object类型
 * @param value 入参
 */
export function isObject(value: unknown): value is Object {
    return isType('Object')(value)
}

/**
 * 判断是否为泛object，不包括null
 * @param value 入参
 */
export function isWideObject(value: unknown): boolean {
    return value !== null && typeof value === 'object'
}

/**
 * 是否为FormData实例 不支持FormData时返回false
 * @param value - 入参
 */
export function isFormData(value: unknown): value is FormData {
    return typeof FormData !== 'undefined' && value instanceof FormData
}

/**
 * 是否为URLSearchParams实例 不支持URLSearchParams时返回false
 * @param value - 入参
 */
export function isURLSearchParams(value: unknown): value is URLSearchParams {
    return (
        typeof URLSearchParams !== 'undefined' &&
        value instanceof URLSearchParams
    )
}
