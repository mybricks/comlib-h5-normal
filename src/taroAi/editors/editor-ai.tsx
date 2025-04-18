import { transformLess } from "../transform";
import { getComponentFromJSX, updateRender, updateStyle } from "../utils";

import getTaroKnowledge from "./knowledges/taro";
import getF2Knowledge from "./knowledges/f2";
import getBrickdKnowledge from './knowledges/brickd-mobile-knowledeges';

import basePrompt from "./prompts/base.md";
import taroComponentsPrompt from "./prompts/taro-components-summary.md";
import f2Prompt from "./prompts/f2-summary.md";
import brickdMobilePrompt from './prompts/brickd-mobile-summary.md';
import MyBricksEnv from './prompts/mybricks-env-summary.md'

import F2ForTaro from './../f2-for-taro';
import * as Taro from "@tarojs/components";
import * as TaroAPI from "@tarojs/taro";
import * as BrickdMobile from 'brickd-mobile';
import dayjs from "dayjs";

export default {
  ":root": {
    active: true,
    role: "comDev", //定义AI的角色
    getSystemPrompts() {
      return {
        langs: "@tarojs/components、@tarojs/taro、brickd-mobile、CSS、Javascript、react",
        prompts: `${basePrompt} \n ${taroComponentsPrompt} \n ${brickdMobilePrompt} \n ${f2Prompt} \n ${MyBricksEnv}`,
      };
    },
    loadKnowledge(items) {
      const rtn: any = [];

      items.forEach((now) => {
        const lib = now.lib || now.from;
        if (!lib.match(/react/)) {
          if (lib === "@tarojs/components") {

            // 加载 Base 组件
            const baseKnowledge = getTaroKnowledge(lib, "BASE");
            if(baseKnowledge) {
              rtn.push({
                from: lib,
                lib,
                item: '基础知识',
                knowledge: baseKnowledge,
              });
            }

            //
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

          if (lib === 'brickd-mobile') {
            const upperCom = now.item.toUpperCase();
            const knowledge = getBrickdKnowledge(lib, upperCom);
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

            // 加载 Base 组件
            const baseKnowledge = getF2Knowledge(lib, "BASE");
            if(baseKnowledge) {
              rtn.push({
                from: lib,
                lib,
                item: '基础知识',
                knowledge: baseKnowledge,
              });
            }

            //
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

      return rtn;
    },
    getComDocs() {
      //没用可以忽略
      debugger;
    },
    preview(response: { id; runtime; style }, edtCtx, libs: { mybricksSdk }) {

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
              getComponentFromJSX(response.runtime, libs, {
                '@tarojs/components': Taro,
                '@tarojs/taro': TaroAPI,
                'f2-for-taro': F2ForTaro,
                'brickd-mobile': BrickdMobile,
                'dayjs': dayjs
              }).then((com) => {
                resolve(com);
              });
            }),
            new Promise((resolve, reject) => {
              transformLess(response.style).then((css) => {
                const myContent = css.replace(/__id__/g, response.id); //替换模版
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
      response: { runtime; style },
      { refresh } = {}
    ) {
      return new Promise((resolve, reject) => {
        if (response.runtime) {
          updateRender({ data }, response.runtime);
        }

        if (response.style) {
          updateStyle({ id, data }, response.style);
        }

        resolve();
      });
    },
  },
};
