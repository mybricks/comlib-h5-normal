import { uuid } from './../utils'

export default {
  // ignore: true,
  ':root'({ data }) {
    return {}
  },
  prompts: {
    summary: `表单容器，可以渲染各种表单项并搜集表单数据，自带提交按钮。
主要作用：约等于 antd的form组件，帮忙搞定：
1. 垂直/水平统一布局；
2. 左侧自动对齐的 label 样式，表单项之间的默认的分割线；
3. 数据收集、校验、提交按钮（可选）； 

何时使用：依赖默认布局 / label 样式；
- 期望统一水平/垂直布局、所有表单项 label 对齐、行距一致、且需要收集信息的情况；

何时不应该使用：样式高度定制，或者表单项只有两个或两个以下；

特别注意：使用此组件必须推荐其他schema=form-item的组件的表单项组件
`,
    usage: `表单容器，可以渲染各种表单项并搜集表单数据，自带提交按钮。
主要作用：约等于 antd的form组件，帮忙搞定：
1. 垂直/水平统一布局；
2. 左侧自动对齐的 label 样式，表单项之间的默认的分割线；
3. 数据收集、校验、提交按钮（可选）； 

何时使用：依赖默认布局 / label 样式；
- 期望统一水平/垂直布局、所有表单项 label 对齐、行距一致、且需要收集信息的情况；

何时不应该使用：样式高度定制，或者表单项只有两个或两个以下；

特别注意：
  - 使用此组件必须推荐其他schema=mybricks.taro.formContainer/formItem的组件的表单项组件；
  - 表单的插槽不允许直接子组件为其他标签，仅允许schema=mybricks.taro.formContainer/formItem的表单项组件；

  slots插槽
  content: 表单的内容
  - 作用域插槽：插槽中仅允许放置schema=mybricks.taro.formContainer/formItem的组件，内置标签和其他组件都不可使用。
    - 表单子组件也就是表单项的layout一般跟随父组件走，也就是width=100%，height=fit-content。

  styleAry声明
  表单项
    - 默认情况下，表单项是透明背景，表单项之间无间距，通过一条无法消除的线分割（所以如果需要分割线无需配置分割线样式），表单项内有上下10，左右16的内间距，默认外边距都是0
    - 如果表单内容比较挤，需要加点paddingBottom
  表单项标题
    - 表单项布局为垂直时，paddingBottom需要预留一些空间，否则影响美观度。比如："paddingBottom:5"
  表单标题
  提交按钮
  - 按钮默认颜色是#fa6400橙红色
  整个表单的背景
  - 可以设置背景色，默认是白色（有些场景需要背景是透明色，比如当表单项是圆角矩形时，且表单项之间有间距）
  - 可以设置圆角，默认是0

  可继承的配置项说明：如果选中了直接的表单项，可以通过添加:parent/前缀来配置表单容器中 :child(mybricks.taro.formContainer/formItem) 下的所有配置项
    比如 { "path": ":parent/表单项/标题", "value": "标题" } 就可以配置表单项，当且仅当配置 :child(mybricks.taro.formContainer/formItem) 下的所有配置项 需要添加:parent/前缀。
`
  },
  modifyTptJson: (component) => {
    if (!component?.data) {
      component.data = {}
    }
    if (!component.data?.items) {
      component.data.items = []
    }

    // // 兼容formContainer里丢进来其他组件的情况
    // if (Array.isArray(component.slots.content.comAry)) {
    //   component.slots.content.comAry = component.slots?.content?.comAry?.map((com, index) => {
    //     const isComNotFormItem = com?.namespace?.indexOf('.form') === -1;
    //     if (isComNotFormItem) {
    //       const item = component.data.items?.[index]
    //       if (item) {
    //         const { width, height, marginLeft, marginRight, marginTop, marginBottom, ...others } = component.style ?? {}

    //         component.style.width = '100%';
    //         component.style.height = '100%';

    //         return {
    //           id: uuid(),
    //           title: component.title,
    //           namespace: 'mybricks.harmony.formItemContainer',
    //           style: {
    //             width,
    //             height,
    //             marginLeft,
    //             marginRight,
    //             marginTop,
    //             marginBottom
    //           },
    //           comAry: [component]
    //         }
    //       } else {
    //         return undefined
    //       }
    //     }
    //     return com
    //   }).filter(c => !!c)
    // }

    component.slots?.content?.comAry?.forEach((com, index) => {
      let item = component.data.items[index]
  
      if (!item && com?.data?.name) {
        item = component.data.items[index] = {}
      }
  
      // if (!com?.data?.name) {
      //   return
      // }
  
      item.id = uuid();
      item.comName = uuid();
      item.hidden = item.hidden ?? false;
      item.visible = item.visible ?? true;
  
      if (!item.label) {
        item.label = com.data?.label
      }
  
      if (!!!com.data?.label && !item.hideLabel) {
        item.hideLabel = true
      }
  
      if (!item.name) {
        item.name = com.data?.name ?? com.data?.label
      }
  
      if (com) {
        com.id = item.id
        com.name = item.comName
      }
    })

    if (!component.data?.submitButtonText) {
      component.data.useSubmitButton = false
    }
  }
}