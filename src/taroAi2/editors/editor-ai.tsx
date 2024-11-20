import { transformLess } from "../transform";
import { getComponentFromJSX, updateRender, updateStyle } from "../utils";
import getKnowledge from "./knowledges";

import basePrompt from "./prompts/base-summary.md";
import taroComponentsPrompt from "./prompts/taro-components-summary.md";
import f2Prompt from "./prompts/f2-summary.md";

export default {
  ':root': {
    active: true,
    role: 'comDev',//定义AI的角色
    getSystemPrompts() {
      return {
        langs: "react、@tarojs/components、CSS、Javascript、Less、mybricks",
        // renderFileTemplate: `({env,data,inputs,outputs,slots}) => {
        //   return <View>HELLO WORLD</View>
        // }`,
        prompts: `${basePrompt} \n ${taroComponentsPrompt} \n ${f2Prompt}`
      }
    },
    loadKnowledge(items) {
      console.log("loadKnowledge", items);
      const rtn = []

      items.forEach(now => {
        const lib = now.lib || now.from
        if (!lib.match(/react/)) {
          if (lib === "@tarojs/components") {
            const upperCom = now.item.toUpperCase()
            const knowledge = getKnowledge(lib, upperCom)
            if (knowledge) {
              rtn.push({
                from: lib,
                lib,
                item: now.item,
                knowledge
              })
            }
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