import { safeModifyTptJson } from "../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "文件上传组件，用于上传文件",
    usage: `文件上传组件

schema=mybricks.taro.formContainer/formItem

data声明
label: string = ""  # 表单项标签
name: string = ""  # 表单项字段名
accept: string = "*"  # 接受上传的文件类型
maxCount: number = 1  # 最大上传数量
maxSize: number = 10  # 单个文件最大大小，单位为MB

slots插槽
无

styleAry声明
无

layout声明
width: 可配置
height: 不可配置，默认为fit-content

事件
onChange: 当文件列表变化时触发
onUpload: 当上传文件时触发

注意事项
- 文件上传需要配合后端接口使用
- accept用于限制文件类型，如".pdf,.doc,.docx"
- maxCount限制最大上传文件数量
- maxSize限制单个文件最大大小
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson(() => {
      // 暂无特殊处理逻辑
    }, component, "formFileUploader");
  },
};
