import { safeModifyTptJson } from "../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "图片上传组件，用于上传图片，支持拍照和从相册选择",
    usage: `图片上传组件

schema=mybricks.taro.formContainer/formItem

data声明
label: string = ""  # 表单项标签
name: string = ""  # 表单项字段名
maxCount: number = 1  # 最大上传数量
maxSize: number = 5  # 单个图片最大大小，单位为MB
sourceType: array = ["album", "camera"]  # 选择图片的来源

slots插槽
无

styleAry声明
无

layout声明
width: 可配置
height: 不可配置，默认为fit-content

事件
onChange: 当图片列表变化时触发
onUpload: 当上传图片时触发

注意事项
- 图片上传支持从相册选择或拍照
- sourceType可选值：album（从相册选择）、camera（拍照）
- maxCount限制最大上传图片数量
- maxSize限制单个图片最大大小
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson(() => {
      // 暂无特殊处理逻辑
    }, component, "formImageUploader");
  },
};
