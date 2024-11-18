// import Camera from './Camera.md';
// import Canvas from './Canvas.md';
import Image from './Image.md';
// import KeyboardAccessory from './KeyboardAccessory.md';
import Label from './Label.md';
// import Map from './Map.md';
import Picker from './Picker.md';
// import PickerView from './PickerView.md';
// import PickerViewColumn from './PickerViewColumn.md';
import Button from './Button.md';
import Checkbox from './Checkbox.md';
import CheckboxGroup from './CheckboxGroup.md';
// import CoverImage from './CoverImage.md';
// import CoverView from './CoverView.md';
import Editor from './Editor.md';
import Form from './Form.md';
// import Icon from './Icon.md';
import Input from './Input.md';
import Progress from './Progress.md';
import RichText from './RichText.md';
import RootPortal from './RootPortal.md';
import ScrollView from './ScrollView.md';
import Swiper from './Swiper.md';
import SwiperItem from './SwiperItem.md';
import Text from './Text.md';
import View from './View.md';
import Radio from './Radio.md';
import RadioGroup from './RadioGroup.md';
import Slider from './Slider.md';
import Switch from './Switch.md';
// import TabItem from './TabItem.md';
// import Tabs from './Tabs.md';
import Textarea from './Textarea.md';
import Video from './Video.md';
import WebView from './WebView.md';

const mdMap = {
  IMAGE: Image, // ✅ 📱✅ 开发一个图片组件，图片默认是“https://test.mybricks.world/image/icon.png”，要求图片充满容器，但是无论容器如何变化，需要展示完整的图片，并且保持原始比例
  LABEL: Label, // ✅ 📱✅ 开发一个多选框，选项有A、B、C，展示标签
  PICKER: Picker, // ✅ 📱✅ 开发一个选择器，选项有A、B、C和一个月份选择器
  BUTTON: Button, // ✅ 📱✅开发一个小尺寸的主按钮，点击并且获取用户信息，用户信息语言设置为英文，同时它需要有点击事件，点击输出随机数
  CHECKBOX: Checkbox,// ✅ 📱✅开发一个多选框，选项有A、B、C （现在不提Label也会自动加上）
  CHECKBOXGROUP: CheckboxGroup, // ✅ 
  EDITOR: Editor, // ❌ 开发一个富文本编辑器，支持撤回和重做功能（taro文档这块不全，且目前还没给最佳实践案例，撤回、重做等api完全生成不了）
  FORM: Form, // ✅ 📱✅ 开发一个表单，输入用户名，身份证，密码，然后可以提交
  INPUT: Input, // ✅ 📱✅ 开发一个输入框，占位符颜色是红色的
  PROGRESS: Progress, // ✅ 📱✅ 开发一个进度条，进度条颜色是红色的
  RICHTEXT: RichText, // ❌ 开发一个组件来显示富文本，可以支持长按选中富文本内容（不会按照props定义来开发）
  ROOTPORTAL: RootPortal, // ✅ 📱✅ 开发一个按钮，点击后弹出一个弹窗，弹窗内容为“Hello World”
  SCROLLVIEW: ScrollView, // ✅ 📱✅ 开发一个可滚动视图，支持下拉刷新，然后在滚动到距离底部20px时，触发加载更多
  SWIPER: Swiper, // ✅ 📱✅ 开发一个轮播图，包含三张图片，设置轮播时间2s
  SWIPERITEM: SwiperItem, // ✅
  TEXT: Text, // ✅ 📱✅ 开发一个文本组件，文本内容为“Hello World”，文本颜色是绿色
  VIEW: View, // ✅ 📱✅ 开发一个视图组件，背景颜色是红色
  RADIO: Radio, // ✅ 📱✅ 开发一个单选框，选项有A、B、C
  RADIOGROUP: RadioGroup, // ✅
  SLIDER: Slider, // ✅ 📱✅ 开发一个滑动选择器，设置最小值为5，最大20，单次移动5个单位，选择器背景色红色，选中的颜色使用绿色，滑块要紫色并且大小尽量小一些，变更后输出，并且支持外部输入当前值
  SWITCH: Switch, // ✅ 📱✅ 开发一个开关，点击后可以输出开关状态，颜色为红色
  TEXTAREA: Textarea, // ✅ 📱✅ 开发一个多行输入框，占位符为“请输入内容”，显示输入的文本数，同时限制文本输入数量30，文本颜色是红色
  VIDEO: Video, // ✅ 📱✅ 开发一个视频播放器，视频地址https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4，封面图https://test.mybricks.world/image/icon.png，需要立即播放！！！后续继续聊了几轮，使用的api都符合预期
  WEBVIEW: WebView, // ✅ 📱✅ 内置网站，地址https://docs.mybricks.world/，网页加载成功和失败都要打印日志，同时接收网站消息
}

export default function getKnowledge(packageName: string, com: string) {
  if (packageName === '@tarojs/components') {
    const upperCom = com.toUpperCase()
    return mdMap[upperCom];
  }
}

// 开发一个标签页组件，内容为A、B、C，点击切换展示不同的内容