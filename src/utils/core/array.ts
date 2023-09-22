/**
 * array like to realy array
 * @param value 类数组
 * @returns 数组
 */
export function toArray(value: unknown) {
    return Array.prototype.slice.call(value)
}
