export default {
  ':root' ({ data }) {
    return {}
  },
  prompts: {
    summary: '图片',
    usage: `图片组件
何时使用：用户需要Logo和图片时使用。
    
data声明
src: string
mode: ['scaleToFill', 'aspectFill']

注意：
- 对于图片组件，尽量保证图片的宽高，如果相对父元素，需要保证父元素的宽高
- 图片也可以配置背景色，在图片没加载出来的时候有兜底效果
- 一般选择 scaleToFill 模式，拉伸图片到铺满

关于图片链接：
  - 如果是Logo，使用https://placehold.co?text=Logo来配置一个带文本和颜色的图标；
  - 如果是图片，使用https://ai.mybricks.world/image-search?term=dog&w=100&h=200，其中term代表搜索词，w和h可以配置图片宽高；
  注意参数：
    - 对于https://placehold.co的text参数的值，必须为英文字符，不允许为中文字符，如果是中文可以用拼音首字母；
    - 对于https://placehold.co的颜色，背景颜色和文颜色要区分开；`
  },
}