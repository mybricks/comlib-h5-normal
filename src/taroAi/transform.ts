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
          transformImportPlugin()
        ]
      }

      if (!window.Babel) {
        loadBabel()
        reject('当前环境 BaBel编译器 未准备好')
      } else {
        transformCode = window.Babel.transform(code, options).code
      }

    } catch (error) {
      console.warn(`当前代码：${code}`)

      reject(`JSX代码编译失败: ${error.message}`)
    }

    return resolve(transformCode)
  })
}

export function transformLess(code): Promise<string> {
  if (!code) {
    return Promise.resolve("")
  }
  return new Promise((resolve, reject) => {
    let res = ''
    try {
      if (window?.less) {
        window.less.render(code, {}, (error, result) => {
          if (error) {
            console.error(error)
            res = ''

            console.warn(`当前代码：${code}`)

            reject(`Less代码编译失败: ${error.message}`)
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

const transformImportPlugin = () => {
  return {
    visitor: {
      Program: {
        enter(path) {
          const importReact = path.node.body.some(
            node => {
              // 检查是否为import声明
              if (node.type !== 'ImportDeclaration' || node.source.value !== 'react') {
                return false;
              }
              
              // 检查是否有默认导入且名称为React
              return node.specifiers.some(
                specifier => 
                  specifier.type === 'ImportDefaultSpecifier' && 
                  specifier.local.name === 'React'
              );
            }
          );
          
          if (!importReact) {
            // 手动构建AST节点
            const importAst = {
              type: "ImportDeclaration",
              specifiers: [
                {
                  type: "ImportDefaultSpecifier",
                  local: {
                    type: "Identifier",
                    name: "React"
                  }
                }
              ],
              source: {
                type: "StringLiteral",
                value: "react"
              }
            };
            
            path.unshiftContainer('body', importAst);
          }
        }
      }
    }
  }
}


// const genLibTypes = async (schema: Record<string, any>) => {
//   const SchemaToTypes = window.jstt;
//   if (!SchemaToTypes) return;
//   schema.title = 'Props';
//   const propTypes = await SchemaToTypes.compile(schema, '', {
//     bannerComment: '',
//     unknownAny: false,
//     format: false
//   }).then((ts) => {
//     return ts.replace('export ', '');
//   })
//
//   return `
//     ${propTypes}\n
//     ${getParamsType('Props')}
//   `
// }

function addIdScopeToCssRules(cssText, id) {
  const regex = /([^{]*)(\{[^}]*\})/g;

  const prefixedCssText = cssText.replace(regex, (match, selectorGroup, ruleBody) => {
    const selectors = selectorGroup.split(',').map(selector => {
      selector = selector.trim();
      if (selector) {
        return `#${id} ${selector}`;
      }
      return selector;
    });

    return `${selectors.join(', ')}${ruleBody}`;
  });

  return prefixedCssText;
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

export {loadLess, loadBabel}