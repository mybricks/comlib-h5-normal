/** brickd所有组件知识库 */
const BRICKD_KNOWLEDGES_MAP: Record<string, string> = (function () {
  const markdowns = require.context('./brickd-mobile', false, /\.ts$/);
  return markdowns.keys().reduce((modules, name) => {
    // 获取模块名
    const moduleName = name.replace(/^\.\/(.*)\.\w+$/, '$1')
    // 导入模块
    modules[moduleName.toUpperCase()] = markdowns(name).default
    return modules
  }, {})
})()

export default function getKnowledge(packageName: string, com: string) {
  if (packageName === "brickd-mobile") {
    const upperCom = com.toUpperCase();
    return BRICKD_KNOWLEDGES_MAP[upperCom];
  }
}