
import React, {useEffect, useMemo, useState, Component, ReactElement, cloneElement} from 'react';
import css from './index.less'


interface CssApi {
  set: (id: string, content: string) => void
  remove: (id: string) => void
}

interface ErrorInfo {
  title: string,
  desc?: string
}

const ErrorTip = ({ title, desc }: ErrorInfo) => {
  return <div className={css.error}>
    <div className={css.title}>{title}</div>
    <div className={css.desc}>{desc}</div>
  </div>
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    error: null,
    errorInfo: null
  };

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    // @ts-ignore
    const errorTip = this.state?.error?.toString ? this.state.error.toString() : (this.state.errorInfo ? this.state.errorInfo.componentStack : null);
  
    if (errorTip) {
      return <ErrorTip title={'组件渲染错误'} desc={errorTip} />
    }

    // @ts-ignore
    return this.props.children; 
  }
}

interface AIJsxProps {
  id: string,
  env: any,
  /** style 代码 */
  styleCode?: string,
  /** jsx 代码 */
  renderCode: string,
  /** AI组件props */
  renderProps: Record<string, any>,
  /** 报错信息 */
  errorInfo?: ErrorInfo,
  /** 占位组件 */
  placeholder?: string | ReactElement
}

export const AIJsxUmdRuntime = ({ id, env, styleCode, renderCode, renderProps, errorInfo, placeholder = 'AI组件' } : AIJsxProps) => {
  const appendCssApi = useMemo<CssApi>(() => {
    if ((env.edit || env.runtime?.debug) && env.canvas?.css) {
      const cssAPI = env.canvas.css
      return {
        set(content) {
          const myContent = content.replaceAll('__id__', id)//替换模版
          cssAPI.set(id, myContent)
        },
        remove() {
          return cssAPI.remove(id)
        }
      }
    }
    return {
      set: (id: string, content: string) => {
        const el = document.getElementById(id);
        if (el) {
          el.innerText = content
          return
        }
        const styleEle = document.createElement('style')
        styleEle.id = id;
        const myContent = content.replaceAll('__id__', id)//替换模版
        styleEle.innerText = myContent
        document.head.appendChild(styleEle);
      },
      remove: (id: string) => {
        const el = document.getElementById(id);
        if (el && el.parentElement) {
          el.parentElement.removeChild(el)
        }
      }
    }
  }, [env])

  // 注入 CSS 代码
  useMemo(() => {
    if (styleCode) {
      appendCssApi.set(`mbcrcss_${id}`, decodeURIComponent(styleCode))
    }
  }, [styleCode, appendCssApi])

  // 卸载 CSS 代码
  useEffect(() => {
    return () => {
      // mbcrcss = mybricks_custom_render缩写
      appendCssApi.remove(`mbcrcss_${id}`)
    }
  }, [])

  const ReactNode = useMemo(() => {
    if (errorInfo) return () => <ErrorTip title={errorInfo.title} desc={errorInfo.desc} />;
    if (renderCode) {
      try {
        eval(decodeURIComponent(renderCode))

        let RT = window[`mbcrjsx_${id}`]

        if (!RT.default) {
          throw new Error('未导出组件定义')
        }
        RT = RT.default
        // return (props) => {
        //   return <ErrorBoundary><RT {...props}></RT></ErrorBoundary>
        // };
        return (props) => {
          return cloneElement(<RT {...props} />, {}, null)
        };
      } catch (error) {
        return () => <ErrorTip title={'获取组件定义失败'} desc={error?.toString?.()} />;
      }
    } else {
      return
    }
  }, [renderCode, errorInfo])


  if (typeof ReactNode !== 'function') {
    return placeholder
  }

  return <ReactNode {...renderProps} />
}

export const AIJsxRuntime = ({ id, env, styleCode, renderCode, renderProps, errorInfo, placeholder = 'AI组件' } : AIJsxProps) => {
  const appendCssApi = useMemo<CssApi>(() => {
    if ((env.edit || env.runtime?.debug) && env.canvas?.css) {
      const cssAPI = env.canvas.css
      return {
        set(id: string, content: string) {
          const myContent = content.replaceAll('__id__', id)//替换模版
          cssAPI.set(id, myContent)
        },
        remove() {
          return cssAPI.remove(id)
        }
      }
    }
    return {
      set: (id: string, content: string) => {
        const el = document.getElementById(id);
        if (el) {
          el.innerText = content
          return
        }
        const styleEle = document.createElement('style')
        styleEle.id = id;
        const myContent = content.replaceAll('__id__', id)//替换模版
        styleEle.innerText = myContent
        document.head.appendChild(styleEle);
      },
      remove: (id: string) => {
        const el = document.getElementById(id);
        if (el && el.parentElement) {
          el.parentElement.removeChild(el)
        }
      }
    }
  }, [env])

  // 注入 CSS 代码
  useMemo(() => {
    if (styleCode) {
      appendCssApi.set(`mbcrcss_${id}`, decodeURIComponent(styleCode))
    }
  }, [styleCode, appendCssApi])

  // 卸载 CSS 代码
  useEffect(() => {
    return () => {
      // mbcrcss = mybricks_custom_render缩写
      appendCssApi.remove(`mbcrcss_${id}`)
    }
  }, [])

  const ReactNode = useMemo(() => {
    if (errorInfo) return () => <ErrorTip title={errorInfo.title} desc={errorInfo.desc} />;
    if (renderCode) {
      try {
        const oriCode = decodeURIComponent(renderCode);

        const Com = runRender(oriCode, {
          'react': React,
          'echarts-for-react': window['echartsForReact'],
          'mybricks': env.mybricksSdk
        })
        // TODO 没有key的话会用预览的高度
        return (props) => cloneElement(<Com {...props} />, {}, null);


        // let RT = window[`mbcrjsx_${id}`]

        // if (!RT.default) {
        //   throw new Error('未导出组件定义')
        // }
        // RT = RT.default
        // // return (props) => {
        // //   return <ErrorBoundary><RT {...props}></RT></ErrorBoundary>
        // // };
        // return (props) => {
        //   return <RT {...props}></RT>
        // };
      } catch (error) {
        return () => <ErrorTip title={'获取组件定义失败'} desc={error?.toString?.()} />;
      }
    } else {
      return
    }
  }, [renderCode, errorInfo])


  if (typeof ReactNode !== 'function') {
    return placeholder
  }

  return <ReactNode {...renderProps} />
}

function runRender(code, dependencies) {
  const wrapCode = `
          (function(exports,require){
            ${code}
          })
        `

  const exports = {
    default: null
  }

  const require = (packageName) => {
    return dependencies[packageName]
  }

  eval(wrapCode)(exports, require)

  return exports.default
}