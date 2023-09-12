const fs = require('fs')
const path = require('path')

let importStr = ''
let str = `
const lib = {
  id: 'xg-comlib',
  title: 'XGraph核心组件库',
  author: 'CMJ',
  icon: '',
  version: '1.0.1',
  comAray: [],
  //visible: true,
  visible: false
}
`

const libSrcPath = path.join(__dirname, './src/')

scanComJson(libSrcPath, 0)

function scanComJson(dirPath, count) {
  const files = fs.readdirSync(dirPath)
  for (const file of files) {
    const info = fs.statSync(dirPath + '/' + file)
    const filePath = path.join(dirPath, '/' + file)

    if (info.isDirectory()) {
      scanComJson(filePath, count + 1)
    } else {
      if (/com\.json$/.test(filePath)) {
        const comJSON = require(filePath)
        const { data, runtime, enable } = comJSON

        if (typeof enable === 'boolean' && !enable) {
          return
        }

        const name = uuid()

        let comImportStr = `
          import ${name}xg from '${filePath}'
          import ${name}rt from '${path.join(filePath, '../', runtime.replace(/.ts(x?)/, ''))}'
        `
        let com = `
          xg: ${name}xg,
          rt: ${name}rt,
        `

        if (data) {
          comImportStr = comImportStr + `\n import ${name}data from '${path.join(filePath, '../', data)}'`
          com = com + `\n data: ${name}data`
        }
      
        let pushCom = `
          lib.comAray.push(merge({${com}}))
        `

        importStr = importStr + `\n ${comImportStr}`
        str = str + `\n ${pushCom}`
      }
    }
  }
}

const res = `
  ${importStr}

  ${str}

  export default lib

  function merge({xg, rt, data, editors, assistence}) {
    return Object.assign(xg, {
      runtime: rt,
      data,
      editors,
      assistence
    })
  }
`

const indexPath = path.join(__dirname, './index.js')
fs.writeFileSync(indexPath, res)

function uuid(pre = 'w', len = 6) {
  const seed = 'abcdefhijkmnprstwxyz0123456789',
    maxPos = seed.length;
  let rtn = '';
  for (let i = 0; i < len; i++) {
    rtn += seed.charAt(Math.floor(Math.random() * maxPos));
  }
  return pre + rtn;
}
