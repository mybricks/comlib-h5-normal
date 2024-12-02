# @tarojs/components
- 描述：一个可以支持多端渲染的基础UI组件库
- 版本：3.6.32

## @tarojs/components中的组件列表
- 视图容器：*View*组件，加上点击事件后也可以用来代替按钮组件。
- 可滚动视图区域：*ScrollView*组件。
- 滑块视图容器：*Swiper*组件，其中只可放置*SwiperItem*组件，否则会导致未定义的行为。
- 滑块视图容器项目：*SwiperItem*组件，仅可放置在*Swiper*组件中，宽高自动设置为100%。
- 固定容器：*RootPortal*组件，使整个子树从页面中脱离出来，类似于在 CSS 中使用 fixed position 的效果。主要用于制作弹窗、弹出层等。
- 进度条：*Progress*组件。
- 富文本：*RichText*组件。
- 文本：*Text*组件。
- 按钮：*Button*组件，带有openType类型的按钮优先考虑使用。
- 多选项目：*Checkbox*组件。
- 多项选择器：*CheckboxGroup*组件，内部由多个*Checkbox*组成。
- 富文本编辑器：*Editor*组件，可以对图片、文字进行编辑。
- 表单：*Form*组件，将组件内的用户输入的*Switch*，*Input*，*Checkbox*，*Slider*，*Radio*，*Picker*提交。
- 输入框：*Input*组件。
- 用来改进表单组件的可用性：*Label*组件，展示标签、标题，点击标题触发控件的点击，用来改进表单组件的可用性。
- 从底部弹起的滚动选择器：*Picker*组件，从底部弹起的滚动选择器，包含普通、多列、时间、日期、省市区选择器。
- 嵌入页面的滚动选择器：*PickerView*组件，其中只可放置*PickerViewColumn*组件，其它节点不会显示。
- 滚动选择器子项：*PickerViewColumn*组件，仅可放置于*PickerView*组件中，其孩子节点的高度会自动设置成与*PickerView*组件的选中框的高度一致。
- 单选项目：*Radio*组件。
- 单项选择器：*RadioGroup*组件，内部由多个*Radio*组成。
- 滑动选择器：*Slider*组件。
- 开关选择器：*Switch*组件。
- 多行输入框：*Textarea*组件。
- 图片：*Image*组件，支持 JPG、PNG、SVG、WEBP、GIF 等格式。
- 视频：*Video*组件。
- 承载网页的容器：*WebView*组件，会自动铺满整个小程序页面。

## @tarojs/components 注意事项
- 任何需求（包括其它类库）的需求，必须引入*View*组件。
- 对于简单的按钮需求（不包含openType属性的按钮等），都必须用*View*组件开发,以获得更好的视觉体验以及更灵活的样式。
