export default {
  ':root' ({ data }) {
    return {}
  },
  prompts: {
    summary: '文本',
    usage: `
data声明
text: string = "文本内容"
ellipsis: boolean = false
maxLines: number = "0"

slots插槽
无

styleAry声明
文本容器: .mybricks-text

美观度注意事项
- 尽量不用全黑的字体颜色，而是用柔和一些的颜色比如深灰色
- 在保证可读性的前提下，尽量使用小字体
- 注意文本和其他组件之间要留有适量的边距（通过layout进行配置）

使用案例
\`\`\`dsl file="page.dsl"
<flex row title="用户信息" layout={{ width: '100%', alignItems: 'center' }}>
<flex column title="用户详情" layout={{ marginLeft: 10 }}>
    <mybricks.taro.text title="用户名" layout={{ width: 'fit-content' }} data={{ text: "健身达人123" }} styleAry={[{ selector: '.mybricks-text', css: { fontSize: '14px', fontWeight: 'bold', color: '#333333' } }]}></mybricks.taro.text>
    <mybricks.taro.text title="评价时间" layout={{ width: 'fit-content' }} data={{ text: "2023-08-15" }} styleAry={[{ selector: '.mybricks-text', css: { fontSize: '12px', color: '#999999' } }]}></mybricks.taro.text>
</flex>
<flex row title="评分" layout={{ marginLeft: '10' }}> //留左边距，防止紧贴着显示。如果是上下结构，同理需要留上边距。
    <mybricks.taro.text title="评分文本" layout={{ width: 'fit-content' }} data={{ text: "9.8" }} styleAry={[{ selector: '.mybricks-text', css: { fontSize: '16px', fontWeight: 'bold', color: '#FF9933' } }]}></mybricks.taro.text>
</flex>
</flex>
\`\`\``
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