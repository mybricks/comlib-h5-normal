import { transformLess } from "../transform";
import { getComponentFromJSX, updateRender, updateStyle } from "../utils";
import getKnowledge from "./promote";

export default {
  ':root': {
    active: true,
    role: 'comDev',//定义AI的角色
    getSystemPrompts() {
      console.log("getSystemPrompts: ")
      return {
        langs: "react、@tarojs/components、CSS、Javascript、Less、mybricks",
        renderFileTemplate: `() => {
          return <View>HELLO WORLD</View>
        }`,
        prompts: `
          不允许使用原生HTML标签,必须使用@tarojs/components提供的组件.
          @tarojs/components库提供了如下组件:
          Image(图片),
          Label(展示标签、标题,点击标题触发控件的点击，用来改进表单组件的可用性),
          Picker(从底部弹起的滚动选择器,包含普通、多列、时间、日期、省市区选择器),
          Button(按钮),
          Checkbox(多选框),
          CheckboxGroup(多选框组),
          Editor(富文本编辑器),
          Form(表单、表单容器,所有表单的开发都需要使用),
          Input(输入框),
          Progress(进度条),
          RichText(富文本),
          RootPortal(脱离dom树,用于制作弹窗、弹出层，当用户要求制作一个弹窗时，必须使用这个组件),
          ScrollView(可滚动视图区域),
          Swiper(轮播图),
          SwiperItem(轮播图项),
          Text(文本),
          View(视图),
          Radio(单选框),
          RadioGroup(单选框组),
          Slider(滑动条),
          Switch(开关),
          Textarea(多行输入框),
          Video(视频),
          WebView(配置网址,嵌入显示网页).

          以下是类型定义:
          interface Target {
            id: string
            tagName: string
            dataset: {
              [key: string]: any
            }
          }
          interface BaseEventOrig<T = any> {
            type: string
            timeStamp: number
            target: Target
            currentTarget: Target
            detail: T
            preventDefault: () => void
            stopPropagation: () => void
          }
          type EventFunction<T = any> = (event: BaseEventOrig<T>) => void
          type ComponentType<T> = ComponentType<T>
        `
      }
    },
    loadKnowledge(items) {
      console.log("loadKnowledge: ", items);
      const rtn = []

      items.forEach(now => {
        if (!now.from.match(/react/)) {
          const knowledge = getKnowledge(now.from, now.item)
          if (knowledge) {
            rtn.push({
              from: now.from,
              item: now.item,
              knowledge
            })
          }
        }
      })

      return rtn
    },
    getComDocs() {
      //没用可以忽略
      debugger
    },
    preview(response: { id, render, style }, edtCtx, libs: { mybricksSdk }) {
      return new Promise((resolve, reject) => {
        if (response) {
          const rtn = (com, css) => {
            resolve({
              com,
              css
            })
          }

          Promise.all([
            new Promise((resolve, reject) => {
              getComponentFromJSX(response.render, libs).then(com => {
                resolve(com)
              })
            }),
            new Promise((resolve, reject) => {
              transformLess(response.style).then(css => {
                const myContent = css.replaceAll('__id__', response.id)//替换模版
                resolve(myContent)
              })
            })
          ]).then(([com, css]) => {
            rtn(com, css)
          }).catch(e => {
            reject(e)
          })
        }
      })
    },
    execute({ id, data, inputs, outputs, slots },
      response: { render, style }, { refresh } = {}) {
      return new Promise((resolve, reject) => {
        if (response.render) {
          updateRender({ data }, response.render)
        }

        if (response.style) {
          updateStyle({ id, data }, response.style)
        }

        resolve()
      })
    }
  }
}