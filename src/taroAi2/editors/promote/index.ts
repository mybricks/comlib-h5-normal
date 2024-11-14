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
  LABEL: Label, // ✅ 📱 开发一个多选框，选项有A、B、C，展示标签
  PICKER: Picker, // ✅ 开发一个选择器，选项有A、B、C和一个月份选择器
  BUTTON: Button, // ✅ 开发一个小尺寸的主按钮，点击并且获取用户信息，用户信息语言设置为英文，同时它需要有点击事件，点击输出随机数
  CHECKBOX: Checkbox,// ✅ 开发一个多选框，选项有A、B、C （现在不提Label也会自动加上）
  CHECKBOXGROUP: CheckboxGroup, // ✅
  EDITOR: Editor, //
  FORM: Form,
  INPUT: Input,
  PROGRESS: Progress,
  RICHTEXT: RichText,
  ROOTPORTAL: RootPortal,
  SCROLLVIEW: ScrollView,
  SWIPER: Swiper,
  SWIPERITEM: SwiperItem,
  TEXT: Text,
  VIEW: View,
  RADIO: Radio, // 开发一个单选框，选项有A、B、C，展示标签
  RADIOGROUP: RadioGroup,
  SLIDER: Slider,
  SWITCH: Switch,
  TEXTAREA: Textarea,
  VIDEO: Video,
  WEBVIEW: WebView,
}

export default function getKnowledge(packageName: string, com: string) {
  if (packageName === '@tarojs/components') {
    const upperCom = com.toUpperCase()
    return mdMap[upperCom];
  }
}

// 开发一个标签页组件，内容为A、B、C，点击切换展示不同的内容