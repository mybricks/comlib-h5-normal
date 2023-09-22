/**
 * 将JSON转为JavaScript对象
 * @param value string 合法的JSON字符串
 * @param reviver function 对结果进行转换的函数。该函数会被对象中的每一个成员调用，如果一个成员的值是一个嵌套对象，则嵌套对象会先于父对象被转换
 * @return any
 */
export function parseJSON(
    value: string,
    reviver?: (this: any, key: string, value: any) => any
): any {
    try {
        return JSON.parse(value, reviver)
    } catch (error) {
        return undefined
    }
}

export type ReplacerType =
    | ((this: any, key: string, value: any) => any)
    | Array<number | string>
    | null

/**
 * 将JavaScript值转为JSON字符串
 * @param value 将被转换的JavaScript值，通常是一个对象或数组
 * @param replacer
 *      1. 可以是一个函数，用来转换结果
 *      2. 也可以是一个字符串或数字数组，用作选择要进行字符串化的对象属性的允许列表
 * @param space 添加缩进，空格和换行符到返回值JSON文本中，增加可读性
 */
export function stringifyJSON(
    value: any,
    replacer?: ReplacerType,
    space?: string | number
): string | undefined {
    try {
        return JSON.stringify(
            value,
            replacer as Array<number | string> | null,
            space
        )
    } catch (error) {
        return undefined
    }
}
