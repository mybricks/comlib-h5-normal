# @tarojs/components
- 描述：一个可以支持多端渲染的基础UI组件库
- 版本：4.0.6

## @tarojs/components中的组件列表
- 视图容器：*View*组件，加上点击事件后也可以用来代替按钮组件。
- 可滚动视图区域：*ScrollView*组件。
- 滑块视图容器：*Swiper*组件，其中只可放置*SwiperItem*组件，否则会导致未定义的行为。
- 滑块视图容器项目：*SwiperItem*组件，仅可放置在*Swiper*组件中，宽高自动设置为100%。
- 固定容器：*RootPortal*组件，使整个子树从页面中脱离出来，类似于在 CSS 中使用 fixed position 的效果。主要用于制作弹窗、弹出层等。
- 进度条：*Progress*组件。
- 富文本：*RichText*组件。
- 文本：*Text*组件，内联标签，不会引起新的行，对标浏览中的`span`标签。
- 富文本编辑器：*Editor*组件，可以对图片、文字进行编辑。
- 视频：*Video*组件。
- 承载网页的容器：*WebView*组件，会自动铺满整个小程序页面。
- 小程序内嵌视频号视频组件： *ChannelVideo*组件，小程序内嵌视频号视频组件，支持在小程序中播放视频号视频。

## @tarojs/components 注意事项
- 任何需求（包括其它类库）的需求，必须引入*View*组件。
