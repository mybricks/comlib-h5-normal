import { uuid } from "./../utils";
import { safeModifyTptJson } from "../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "表单容器，用于收集和提交表单数据，支持统一布局、数据校验、提交按钮等功能",
    usage: `表单容器，用于收集和提交表单数据

主要作用：
1. 统一管理表单项的垂直/水平布局
2. 自动对齐表单标题，表单项之间默认分割线
3. 数据收集、校验、提交功能

何时使用：
- 需要统一水平/垂直布局、所有表单项label对齐、行距一致的情况
- 需要收集用户信息并提交的场景
- 需要使用表单校验功能的场景

何时不应该使用：
- 样式高度定制的表单
- 表单项只有两个或以下的简单场景

data声明
useSubmitButton: boolean = true  # 是否显示提交按钮
submitButtonText: string = "提交"  # 提交按钮的文案
skipValidation: "all" | "hidden" | "none" = "all"  # 提交表单时校验规则
useLoading: boolean = false  # 是否开启异步提交
itemLayout: "horizontal" | "vertical" = "horizontal"  # 表单项布局
items: array = []  # 表单项配置数组

slots插槽
content: 表单内容插槽，仅允许放置schema=mybricks.taro.formContainer/formItem的表单项组件

styleAry声明
表单项: .mybricks-field
  - 可编辑样式: font、border、padding、margin、background

表单标题: .taroify-form-label
  - 可编辑样式: size

提交按钮: .mybricks-submit .taroify-button
  - 可编辑样式: border、background、font

layout声明
width: 可配置，默认375
height: 可配置，默认为auto

输入项
finishLoading: 提交完成（仅在useLoading为true时）

事件
onSubmit: 表单提交时触发，返回表单数据

子组件配置（:child）
表单项通用属性：
- hideLabel: 是否隐藏标题
- itemLayout: 表单项布局（unset-跟随父组件，horizontal-水平，vertical-垂直）
- icon: 表单项标题前的图标
- label: 表单项标题
- name: 表单项字段名，用于提交时的参数名
- rules: 校验规则数组
- hidden: 是否隐藏当前项（隐藏后仍可通过输入项获取和设置数据）

注意事项
- 使用此组件必须同时推荐schema=mybricks.taro.formContainer/formItem的表单项组件
- 表单的内容插槽不允许直接放置非表单项组件
- 表单项的layout一般设置为width=100%，height=fit-content
- 提交按钮默认颜色是#fa6400橙红色
- 表单默认背景是白色，可根据需要设置为透明色
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson((comp) => {
      if (!comp?.data) {
        comp.data = {};
      }
      if (!comp.data?.items) {
        comp.data.items = [];
      }

      comp.slots?.content?.comAry?.forEach((com: any, index: number) => {
        let item = comp.data.items[index];

        if (!item && com?.data?.name) {
          item = comp.data.items[index] = {};
        }

        item.id = uuid();
        item.comName = uuid();
        item.hidden = item.hidden ?? false;
        item.visible = item.visible ?? true;

        if (!item.label) {
          item.label = com.data?.label;
        }

        if (!!!com.data?.label && !item.hideLabel) {
          item.hideLabel = true;
        }

        if (!item.name) {
          item.name = com.data?.name ?? com.data?.label;
        }

        if (com) {
          com.id = item.id;
          com.name = item.comName;
        }
      });

      if (!comp.data?.submitButtonText) {
        comp.data.useSubmitButton = false;
      }
    }, component, "formContainer");
  },
};
