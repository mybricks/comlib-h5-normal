import { CSS_LANGUAGE } from './types'

export function getComponentFromJSX(jsxCode, libs: { mybricksSdk }): Promise<Function> {
  return new Promise((resolve, reject) => {
    // const importRegex = /import\s+((?:[\s\S]*?))\s+from(\s+)?['"]([^'"]+)['"]/g;

    // const loadLibs = []

    // const sourceCode = jsxCode.replace(importRegex, (match, vars, oo, npm) => {
    //   const un = npm.toUpperCase()
    //   if (un !== 'REACT' && un !== 'INDEX.LESS' && un !== 'ANTD') {
    //     //debugger
    //     const lib = LibsReg.find(lib => lib.title.toUpperCase() === un)
    //     if (lib) {
    //       loadLibs.push(lib)
    //       return `const ${vars} = ${lib.moduleDef}`
    //     } else {

    //     }
    //   }

    //   return match
    // })

    transformTsx(jsxCode).then(code => {
      try {
        const rtn = runRender(code, {
            'react': window['react'],
            'echarts-for-react': window['echartsForReact'],
            'mybricks': libs.mybricksSdk
          }
        )

        resolve(rtn)
      } catch (ex) {
        reject(ex)
        return
      }
    }).catch(ex => {
      reject(ex)
    })
  })
}

export function transformTsx(code): Promise<string> {
  return new Promise((resolve, reject) => {
    let transformCode

    try {
      const options = {
        presets: [
          [
            "env",
            {
              "modules": "commonjs"//umd->commonjs
            }
          ],
          'react'
        ],
        plugins: [
          ['proposal-decorators', {legacy: true}],
          'proposal-class-properties',
          [
            'transform-typescript',
            {
              isTSX: true
            }
          ],
          //transformImportPlugin()
        ]
      }

      if (!window.Babel) {
        loadBabel()
        reject('当前环境 BaBel编译器 未准备好')
      } else {
        transformCode = window.Babel.transform(code, options).code
      }

    } catch (error) {
      reject(error)
    }

    return resolve(transformCode)
  })
}

export function transformLess(code): Promise<string> {
  return new Promise((resolve, reject) => {
    let res = ''
    try {
      if (window?.less) {
        window.less.render(code, {}, (error, result) => {
          if (error) {
            console.error(error)
            res = ''

            reject(`Less 代码编译失败: ${error.message}`)
          } else {
            res = result?.css
          }
        })
      } else {
        loadLess() // 重试
        reject('当前环境无 Less 编译器，请联系应用负责人')
      }
    } catch (error) {
      reject(error)
    }

    return resolve(res)
  }) as any
}

export function updateRender({data}, renderCode) {
  transformTsx(renderCode).then(code => {
    data._renderCode = encodeURIComponent(code)
    data._jsxErr = ''
  }).catch(e => {
    data._jsxErr = e?.message ?? '未知错误'
  })
}

export function updateStyle({data}, styleCode) {
  transformLess(styleCode).then(css => {
    data._styleCode = encodeURIComponent(css)
    data._cssErr = '';
  }).catch(e => {
    data._cssErr = e?.message ?? '未知错误'
  })
}


async function requireFromCdn(cdnUrl) {
  return new Promise((resolve, reject) => {
    const el = document.createElement('script');
    el.src = cdnUrl
    document.body.appendChild(el)
    el.onload = () => {
      resolve(true)
    }
    el.onerror = () => {
      reject(new Error(`加载${cdnUrl}失败`))
    }
  })
}

async function loadLess() {
  if (window?.less) {
    return
  }
  await requireFromCdn('https://f2.beckwai.com/udata/pkg/eshop/fangzhou/asset/less/4.2.0/less.js')
}

async function loadBabel() {
  if (window?.Babel) {
    return
  }

  await requireFromCdn('https://f2.beckwai.com/udata/pkg/eshop/fangzhou/asset/babel/standalone/7.24.7/babel.min.js')
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