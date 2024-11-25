import { transformLess } from "../transform";
import { getComponentFromJSX, updateRender, updateStyle } from "../utils";

import getTaroKnowledge from "./knowledges/taro";
import getF2Knowledge from "./knowledges/f2";

import basePrompt from "./prompts/base.md";
import taroComponentsPrompt from "./prompts/taro-components-summary.md";
import f2Prompt from "./prompts/f2-summary.md";

import F2ForTaro from './../f2-for-taro';
import * as Taro from "@tarojs/components";
import * as TaroAPI from "@tarojs/taro";

export default {
  ":root": {
    active: true,
    role: "comDev", //定义AI的角色
    getSystemPrompts() {
      return {
        langs:
          "react、@tarojs/components、f2-for-taro、CSS、Javascript、Less、mybricks",
        // renderFileTemplate: `({env,data,inputs,outputs,slots}) => {
        //   return <View>HELLO WORLD</View>
        // }`,
        prompts: `${basePrompt} \n ${taroComponentsPrompt} \n ${f2Prompt}`,
      };
    },
    loadKnowledge(items) {
      console.log("loadKnowledge", items);
      const rtn: any = [];

      items.forEach((now) => {
        const lib = now.lib || now.from;
        if (!lib.match(/react/)) {
          if (lib === "@tarojs/components") {
            const upperCom = now.item.toUpperCase();
            const knowledge = getTaroKnowledge(lib, upperCom);
            if (knowledge) {
              rtn.push({
                from: lib,
                lib,
                item: now.item,
                knowledge,
              });
            }
          }

          if (lib === "f2-for-taro") {
            const upperCom = now.item.toUpperCase();
            const knowledge = getF2Knowledge(lib, upperCom);

            if (knowledge) {
              rtn.push({
                from: lib,
                lib,
                item: now.item,
                knowledge,
              });
            }
          }
        }
      });

      console.warn("loadKnowledge", rtn);

      return rtn;
    },
    getComDocs() {
      //没用可以忽略
      debugger;
    },
    preview(response: { id; render; style }, edtCtx, libs: { mybricksSdk }) {
      return new Promise((resolve, reject) => {
        if (response) {
          const rtn = (com, css) => {
            resolve({
              com,
              css,
            });
          };

          Promise.all([
            new Promise((resolve, reject) => {
              getComponentFromJSX(response.render, libs, {
                '@tarojs/components': Taro,
                '@tarojs/taro': TaroAPI,
                'f2-for-taro': F2ForTaro,
              }).then((com) => {
                resolve(com);
              });
            }),
            new Promise((resolve, reject) => {
              transformLess(response.style).then((css) => {
                const myContent = css.replaceAll("__id__", response.id); //替换模版
                resolve(myContent);
              });
            }),
          ])
            .then(([com, css]) => {
              rtn(com, css);
            })
            .catch((e) => {
              reject(e);
            });
        }
      });
    },
    execute(
      { id, data, inputs, outputs, slots },
      response: { render; style },
      { refresh } = {}
    ) {
      return new Promise((resolve, reject) => {
        if (response.render) {
          updateRender({ data }, response.render);
        }

        if (response.style) {
          updateStyle({ id, data }, response.style);
        }

        resolve();
      });
    },
  },
};
