import { isDesigner } from './env'

/**
 * @description 
 */
function pxToVw(env, style) {
  if (!style) {
    return {}
  }

  if (isDesigner(env)) {
    return style
  }

  const cssStyle = {}

  const matchKeys = ['marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'paddingLeft', 'paddingRight', 'width', 'height', 'fontSize', 'lineHieght'];

  Object.keys(style).forEach(property => {
    const newVal = parseFloat(style[property])
    if (matchKeys.includes(property) && !isNaN(newVal) && style[property] !== '100%') {
      cssStyle[property] = env.pxToVw(`${newVal}px`)
    } else {
      cssStyle[property] = style[property]
    }
  })
  return cssStyle
}

export const transformStylePxToVw = pxToVw