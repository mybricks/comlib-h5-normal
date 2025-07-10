import { uuid } from './../utils'

export default {
  ignore: true,
  ':root'({ data }) {
    return {}
  },
  prompts: {
    summary: `表单容器，可以渲染各种表单项并搜集表单数据，自带提交按钮
何时使用：仅在需要搜集信息的表单页面中使用，其他时候可以直接使用表单项组件搭建而成
特别注意：使用此组件必须引用其他schema=form-item的组件的表单项组件
`,
    usage: `
  data声明
  submitButtonText?: string = "提交" ## 提交按钮的文案，如果不配置此属性，则隐藏提交按钮
  items: {
    id: string,
    name: string,
    label: string,
    hideLabel?: boolean = false
  }[]
  itemLayout: ['horizontal', 'vertical'] = 'horizontal'

  slots插槽
  content: 表单的内容
  - 作用域插槽：form-item，插槽中仅允许放置schema=form-item的组件，内置标签和其他组件都不可使用。

  styleAry声明
  表单项: .mybricks-field
    - 默认情况下，表单项是透明背景，表单项之间无间距，通过一条无法消除的线分割，表单项内有上下10，左右16的内间距，默认外边距都是0
    - 如果表单内容比较挤，需要加点paddingBottom
  表单项标题: .taroify-cell__title
    - 表单项布局为垂直时，paddingBottom需要预留一些空间，否则影响美观度。比如："paddingBottom:5"
  表单标题: .taroify-form-label
  提交按钮: .mybricks-submit .taroify-button
  - 按钮默认颜色是#fa6400橙红色
  整个表单的背景: .taroify-cell-group
  - 可以设置背景色，默认是白色（有些场景需要背景是透明色，比如当表单项是圆角矩形时，且表单项之间有间距）
  - 可以设置圆角，默认是0

  使用案例
  \`\`\`dsl file="page.dsl"
  <mybricks.harmony.formContainer
    title="登录表单"
    data={{
      config: {
        colon: true,
        layout: 'horizontal'
      },
      items: [
        { id: "name", label: "用户名", name: "name"},
        { id: "password", label: "密码", name: "password"}
      ],
    }}
  >
    <slots.content title="表单项内容" layout={{ width: '100%' }}>
      <mybricks.harmony.formInput
        title="用户名"
        layout={{ width: '100%', marginTop: '5px',marginBottom: '5px' }} //当用户提到要给表单项加间距时，或者视觉上需要加点留白空间时，可通过layout中的marginTop,marginBottom进行配置
        data={{
            label:"用户名",
            name:"name",
            placeholder: "请输入用户名",
        }}
      />
      <mybricks.harmony.formPassword
        title="密码"
        layout={{ width: '100%', marginTop: '5px',marginBottom: '5px' }} //当用户提到要给表单项加间距时，或者视觉上需要加点留白空间时，可通过layout中的marginTop,marginBottom进行配置
        data={{
            label:"密码",
            name:"password",
            placeholder: "请输入密码",
        }}
      />
    </slots.content>
  </mybricks.harmony.formContainer>
  \`\`\`
  注意：表单的插槽不允许子组件为flex，仅允许为表单项`
  },
  modifyTptJson: (component) => {
    if (!component?.data) {
      component.data = {}
    }
    if (!component.data?.items) {
      component.data.items = []
    }
    component.slots?.content?.comAry?.forEach((com, index) => {
      let item = component.data.items[index]
  
      if (!item && com?.data?.name) {
        item = component.data.items[index] = {}
      }
  
      if (!com?.data?.name) {
        return
      }
  
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