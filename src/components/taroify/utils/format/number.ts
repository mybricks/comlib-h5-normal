import * as _ from "../../../../utils/lodash"

function trimExtraChar(value: string, char: string, regExp: RegExp) {
  const index = value.indexOf(char)

  if (index === -1) {
    return value
  }

  if (char === "-" && index !== 0) {
    return value.slice(0, index)
  }

  return value.slice(0, index + 1) + value.slice(index).replace(regExp, "")
}

export function formatNumber(value: string, allowDot = true, allowMinus = true) {
  if (allowDot) {
    value = trimExtraChar(value, ".", /\./g)
  } else {
    value = value.split(".")[0]
  }

  if (allowMinus) {
    value = trimExtraChar(value, "-", /-/g)
  } else {
    value = value.replace(/-/, "")
  }

  const regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g

  return value.replace(regExp, "")
}

// add num and avoid float number
export function addNumber(num1: number, num2: number) {
  const cardinal = 10 ** 10
  return Math.round((_.toNumber(num1) + _.toNumber(num2)) * cardinal) / cardinal
}

export function padZero(num: number | string, targetLength = 2): string {
  return _.padStart(_.toString(num), targetLength, "0")
}
