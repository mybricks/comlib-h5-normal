import React, {useEffect, useMemo, useRef, useCallback} from 'react';
import {runRender} from './utils'
import * as Taro from "@tarojs/components";
import { View } from "@tarojs/components";

import { copyToClipboard } from "./utils/ai-code";
import css from "./runtime.less";

const ErrorStatus = ({title = '未知错误', children = null, onError}) => {
  onError(title)//向外抛出错误

  return (
    <View style={{color: 'red'}}>
      {title}
      <br/>
      {children}
    </View>
  )
}

const IdlePlaceholder = ({examples = [] }) => {
  const copy = useCallback((text) => {
    copyToClipboard(text).then((res) => {
      window?.antd?.message
        ? window?.antd?.message.success('复制成功')
        : alert('复制成功')
    })
  }, [])

  const CopyIcon = useCallback(() => {
    return (
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5474"
      >
        <path
          d="M720 192h-544A80.096 80.096 0 0 0 96 272v608C96 924.128 131.904 960 176 960h544c44.128 0 80-35.872 80-80v-608C800 227.904 764.128 192 720 192z m16 688c0 8.8-7.2 16-16 16h-544a16 16 0 0 1-16-16v-608a16 16 0 0 1 16-16h544a16 16 0 0 1 16 16v608z"
          p-id="5475"
          fill="#555555"
        ></path>
        <path
          d="M848 64h-544a32 32 0 0 0 0 64h544a16 16 0 0 1 16 16v608a32 32 0 1 0 64 0v-608C928 99.904 892.128 64 848 64z"
          p-id="5476"
          fill="#555555"
        ></path>
        <path
          d="M608 360H288a32 32 0 0 0 0 64h320a32 32 0 1 0 0-64zM608 520H288a32 32 0 1 0 0 64h320a32 32 0 1 0 0-64zM480 678.656H288a32 32 0 1 0 0 64h192a32 32 0 1 0 0-64z"
          p-id="5477"
          fill="#555555"
        ></path>
      </svg>
    )
  }, [])

  return (
    <View className={css.tip}>
      <View className={css.content}>
        <strong>请通过右下角「对话框」提问生成组件</strong>
      </View>
      比如：
      {examples.map((example) => {
        return (
          <View
            className={css.example}
            key={example}
            onClick={() => copy(example)}
          >
            - {example} <CopyIcon />
          </View>
        )
      })}
    </View>
  )
}

export default ({env, data, inputs, outputs, slots, logger, id, onError}) => {
  const container = useRef((env.edit || env.runtime.debug) ? document.querySelector("#_mybricks-geo-webview_")!.shadowRoot : null);
  useMemo(() => {
    if (env.edit) {
      data._editors = void 0
    }
  }, [])

  const dynCss = useMemo(() => {
    const cssAPI = env.canvas?.css || {
      set(){},
      remove(){},
    }
    return {
      set(content) {
        const myContent = content.replaceAll('__id__', id)//替换模版
        cssAPI.set(id, myContent)
      },
      remove() {
        return cssAPI.remove(id)
      }
    }
  }, [env])

  useMemo(() => {
    if (data._styleCode) {
      dynCss.set(decodeURIComponent(data._styleCode))
    }
  }, [data._styleCode, dynCss])

  // useEffect(() => {
  //   return () => {
  //     dynCss.remove()
  //   }
  // }, [])

  const errorInfo = useMemo(() => {
    if (!!data._jsxErr) {
      return {
        title: 'JSX 编译失败',
        tip: data._jsxErr
      }
    }

    if (!!data._cssErr) {
      return {
        title: 'Less 编译失败',
        tip: data._cssErr
      }
    }
  }, [data._jsxErr, data._cssErr])

  const ReactNode = useMemo(() => {
    if (errorInfo) return errorInfo.tip;
    if (data._renderCode) {
      console.log("ai: start")
      try {
        const oriCode = decodeURIComponent(data._renderCode)
        const com = runRender(oriCode, {
          'react': React,
          '@tarojs/components': Taro,
          'mybricks': env.mybricksSdk,
        })
        return com
      } catch (error) {
        console.log("ai 解析错误: ", error)
        console.log("ai 解析错误: ", error?.message)
        console.log("ai 解析错误: ", error?.toString())
        console.log("ai 解析错误: ", String(error))
        return error?.toString()
      }
    } else {
      return function () {
        return (
          <IdlePlaceholder
            examples={[
              "实现一个滚动容器"
            ]}
          />
        )
      }
    }
  }, [data._renderCode, errorInfo])

  const scope = useMemo(() => {
    return {
      data,
      inputs: new Proxy({}, {
        get(_, id) {
          if (env.runtime) {
            return (fn) => {
              inputs[id]((value, relOutputs) => {
                fn(value, new Proxy({}, {
                  get(_, key) {
                    ///TODO
                  }
                }))
              })
            }
            return () => {
            }
          }
          return () => {
          }
        }
      }),
      outputs: new Proxy({}, {
        get(obj, id) {
          if (env.runtime) {
            const rtn = outputs[id]

            if (rtn) {
              return rtn
            }
          }

          return () => {
          }
        }
      }),
      slots: new Proxy({}, {
        get(obj, id) {
          const rtn = slots[id]

          if (rtn) {
            return rtn
          } else {
            return {
              render() {

              }
            }
          }
        }
      }),
      env,
      context: {React}
    }
  }, [slots])

  return (
    <>
      {typeof ReactNode === 'function' ? (
          <ReactNode {...scope} />
      ) : (
        <ErrorStatus title={errorInfo?.title} onError={onError}>{ReactNode}</ErrorStatus>
      )}
    </>
  )
};
