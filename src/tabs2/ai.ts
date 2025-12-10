export default {
  ':root' ({ data }) {
    return {}
  },
  prompts: {
    summary: '标签页组件，用于切换标签项，是一个文字+下方选中条的tab形态(在遇到多个高度相似按钮排列在一起,且有一个为高亮态时高优先使用)',
    usage: `标签页组件，用于切换标签项，是一个文字+下方选中条的tab形态(在遇到多个高度相似按钮排列在一起,且有一个为高亮态时高优先使用)

slots插槽
动态插槽：插槽id=标签项的_id

styleAry相关
选中条
- 默认样式: 
  - backgroundColor: #EE0A24
  - width: 40px
  - height: 3px
  - borderRadius: 3px
- 可编辑样式: backgroundColor、size、border相关

注意事项:
  - 对于标签项的宽度，默认是fill拉伸铺满，也就是所有tab均分平铺，如果配置fit则是从左到右适应内容平铺；
  - 你是高级产品经理，有非常全面的思考，能精准识别出页面上哪些功能是带有切换逻辑的，最高优先使用tab组件，以实现正常的切换逻辑：
    - 比如一些看起来像按钮组（包含多个相似按钮，可能有一个颜色和其他按钮不同），要实现点击后高亮态切换，这种情况下用tab组件是最合理的
    - 比如有些日历、月份选择，点击后切到对应的时间并高亮，这种也是用tab组件最合理的
    - 比如有多段文本并排在一起，其中有一个文本带有下划线，这种需要额外关注，可能会有切换逻辑
    - 如果遇到有些功能是需要tab组件的，但是使用tab组件会导致UI还原度不高，这种情况也优先使用tab组件，以交互功能为优先
    - 目前tab组件暂时不支持红点，所以遇到带红点的tab时，忽略掉红点，直接使用tab组件即可
  - 标签项（未选中）和 标签项（已选中）的borderRadius、padding必须保持高度一致，不然在切换时会有视觉上的不和谐。
`
  },
  modifyTptJson: (component) => {
    let configHeight

    component.style?.styleAry?.forEach?.((style, index) => {
      if (style.selector === ".taroify-tabs") {
        style.selector = ".taroify-tabs__wrap .taroify-tabs__wrap__scroll"
        if (style?.css?.height) {
          configHeight = style?.css?.height
        }
      }
      if (style.selector === ".taroify-tabs__tab") {
        style.selector = `.taroify-tabs__tab:not(.taroify-tabs__tab--active):not(#{id} *[data-isslot="1"] *)`
      }
      if (style.selector === ".taroify-tabs__tab--active") {
        style.selector = `.taroify-tabs__tab--active:not(#{id} *[data-isslot="1"] *)`
      }
      if (style.selector === ".taroify-tabs__line") {
        style.selector = `.taroify-tabs__line:not(#{id} *[data-isslot="1"] *)`
      }
    })

    if (configHeight) {
      component.style.styleAry.push({
        selector: '.taroify-tabs__wrap',
        css: {
          height: configHeight
        }
      })
    }
   
  }


}