export default {
  ':root' ({ data }) {
    return {}
  },
  prompts: {
    summary: '文本',
    usage: `文本组件
slots插槽
无

layout声明
width: 可配置
height: 不可配置，默认为fit-content

layout规则
- width，取决文字内容（中英文、特殊符号以及字符个数）以及fontSize；
- height，取决于文字内容（中英文、特殊符号以及字符个数）、fontSize、lineHeight以及是否配置了maxLines；

美观度注意事项
- 注意配置fontSize同时要配置lineHeight，否则会无法正常展示；
- 尽量不用全黑的字体颜色，而是用柔和一些的颜色比如深灰色；
- 在保证可读性的前提下，尽量使用小字体；
- 对于大部分（特别是动态内容）的文本，需要配置data中的ellipsis + maxLines，防止内容过多换行；
- 注意文本和其他组件之间要留有适量的边距（通过layout进行配置）；
`
  },
  modifyTptJson: (component) => {
    const isConfigCenter = component?.data?.styleAry?.some(s => {
      return s.css?.textAlign === 'center'
    })

    // 幻觉处理：配置了center代表肯定要居中，此时不能配置非100%，不然不会居中
    if (isConfigCenter && component?.layout?.width !== '100%') {
      if (!component.layout) {
        component.layout = {}
      }
      component.layout.width = '100%'
    }

    if (component?.style?.styleAry) {
      component?.style?.styleAry.forEach(item => {
        if (!item.css) {
          item.css = {}
        }
        if (item.css?.fontSize) {
          const realFontSize = String(item.css.fontSize)?.indexOf('px') > -1 ? parseFloat(item.css.fontSize) : item.css.fontSize
          if (realFontSize > 14) {
            item.css.lineHeight = `${realFontSize + 6}px`
          }
        }
      })
    }
  }
}