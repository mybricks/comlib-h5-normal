import {transformLess, transformTsx} from "./transform";
import LibsReg from "./editors/libs";
import React from "react";

export function uuid(pre = 'u_', len = 6) {
  const seed = 'abcdefhijkmnprstwxyz0123456789', maxPos = seed.length;
  let rtn = '';
  for (let i = 0; i < len; i++) {
    rtn += seed.charAt(Math.floor(Math.random() * maxPos));
  }
  return pre + rtn;
}


export function polyfillRuntime() {
  if (!window?.['react']) {
    window['react'] = window['React']
  }
}

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
            'react': React,
            'antd': window['antd_5_21_4'],
            '@ant-design/icons': window['icons'],
            'mybricks': libs.mybricksSdk,
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

export function runRender(code, dependencies) {
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

export function updateRender({data}, renderCode) {
  // const importRegex = /import\s+((?:[\s\S]*?))\s+from(\s+)?['"]([^'"]+)['"]/g;

  // const loadLibs = []

  // renderCode = renderCode.replace(importRegex, (match, vars, oo, npm) => {
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

  transformTsx(renderCode).then(code => {
    data._renderCode = encodeURIComponent(code)
    data._jsxErr = ''
  }).catch(e => {
    data._jsxErr = e?.message ?? '未知错误'
  })
}

export function updateStyle({id, data}, styleCode) {
  transformLess(styleCode).then(css => {
    data._styleCode = encodeURIComponent(css)
    data._cssErr = '';
  }).catch(e => {
    data._cssErr = e?.message ?? '未知错误'
  })
}