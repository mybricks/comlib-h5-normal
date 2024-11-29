# @tarojs/components
- @tarojs/components 是一个可以支持多端渲染的基础UI组件库。
- 版本：3.6.32

## @tarojs/components中的组件列表
- Text(文本)。
- View(视图,加上点击事件后也可以用来模拟出一个按钮)。
- Image(图片)。
- Label(展示标签、标题,点击标题触发控件的点击，用来改进表单组件的可用性)。
- Picker(从底部弹起的滚动选择器,包含普通、多列、时间、日期、省市区选择器)。
- Button(按钮,带有openType类型的按钮优先考虑使用)。
- Checkbox(多选框)。
- CheckboxGroup(多选框组)。
- Editor(富文本编辑器)。
- Form(表单、表单容器,所有表单的开发都需要使用)。
- Input(输入框)。
- Progress(进度条)。
- RichText(富文本)。
- RootPortal(脱离dom树,用于制作弹窗、弹出层，当用户要求制作一个弹窗时，必须使用这个组件)。
- ScrollView(可滚动视图区域)。
- Swiper(轮播图)。
- SwiperItem(轮播图项)。
- Radio(单选框)。
- RadioGroup(单选框组)。
- Slider(滑动选择器、滑块)。
- Switch(开关)。
- Textarea(多行输入框)。
- Video(视频)。
- WebView(配置网址,嵌入显示网页)。

## @tarojs/components 注意事项
- 任何需求（包括其它类库）的需求，必须引入*View*组件。
- 对于简单的按钮需求（不包含openType属性的按钮等），都必须用*View*组件开发,以获得更好的视觉体验以及更灵活的样式。
