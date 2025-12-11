import { getFormItem } from "./utils";
import { FormItems, Data, RuleKeys } from "./types";

function getFormItemProp(
  { data, ...com }: { data: Data; id: string; name: string },
  name: keyof FormItems
) {
  try {
    const item = getFormItem(data.items, { id: com.id, name: com.name });

    return item?.[name];
  } catch (e) {
    console.error(e);
  }
}

export const defaultValidatorExample = `export default async function (value, context) {
  if (!value && ![0, false].includes(value)) {
    context.failed(\`内容不能为空\`);
  } else {
    context.successed();
  }
}
`;

const defaultRules = [
  {
    key: RuleKeys.REQUIRED,
    status: false,
    visible: true,
    title: "必填",
    message: "内容不能为空",
  },
  // {
  //   key: RuleKeys.CODE_VALIDATOR,
  //   status: false,
  //   visible: true,
  //   title: '代码校验',
  //   validateCode: defaultValidatorExample
  // }
];

const submitEditorItems = [
  {
    title: "显示提交按钮",
    description: "开启后，会在表单底部显示提交按钮",
    type: "switch",
    value: {
      get({ data }) {
        return data.useSubmitButton;
      },
      set({ data }, val) {
        data.useSubmitButton = val;
      },
    },
  },
  {
    ifVisible({ data }) {
      return data.useSubmitButton;
    },
    title: "按钮文案",
    description: "提交按钮的文案",
    type: "text",
    value: {
      get({ data }) {
        return data.submitButtonText;
      },
      set({ data }, value) {
        data.submitButtonText = value;
      },
    },
  },
  {
    title: "异步提交",
    description: "开启后，需要手动调用「提交完成」来结束提交状态",
    type: "switch",
    value: {
      get({ data }) {
        return data.useLoading;
      },
      set({ data, input }, val) {
        data.useLoading = val;

        if (val) {
          input.add("finishLoading", "提交完成", { type: "any" });
        } else {
          input.remove("finishLoading");
        }
      },
    },
  },
  {
    title: "提交表单校验规则",
    description: "提交表单时，校验规则",
    type: "radio",
    options: [
      { label: "校验", value: "all" },
      { label: "不校验隐藏表单项", value: "hidden" },
      { label: "不校验所有表单项", value: "none" },
    ],
    value: {
      get({ data }) {
        // 兼容老数据
        if (!data.skipValidation) {
          return "all";
        }

        if (data.skipValidation === true) {
          return "none";
        }

        //
        return data.skipValidation;
      },
      set({ data }, val) {
        data.skipValidation = val;
      },
    },
  },
];

export default {
  ":slot": {},
  "@init": ({ style, data }) => {
    style.width = 375;
    style.height = "auto";
  },
  "@resize": {
    options: ["width", "height"],
  },
  "@childAdd"({ data, inputs, outputs, logs, slots }, child, curSlot) {
    if (curSlot.id === "content") {
      const { id, inputDefs, outputDefs, name } = child;
      if (!Array.isArray(data.items)) {
        data.items = [];
      }
      const item = data.items.find((item) => item.id === id);
      // const com = outputDefs.find((item) => item.id === 'returnValue');

      if (isNaN(data.nameCount)) {
        data.nameCount = 0;
      }

      const label = `表单项${++data.nameCount}`;

      if (item) {
        // item.schema = com.schema;
      } else {
        data.items.push({
          id,
          comName: name,
          // schema: com.schema,
          name: label,
          label: label,
          hidden: false,
          rules: [],
          visible: true,
        });
      }
    }
  },
  "@childRemove"({ data, inputs, outputs, logs, slots }, child) {
    const { id, name, title } = child;

    data.items = data.items.filter((item) => {
      if (item?.comName) {
        return item.comName !== name;
      }

      return item.id !== id;
    });

    // refreshSchema({ data, inputs, outputs, slots });
  },
  ".mybricks-field .taroify-form-label": {
    "@dblclick": {
      type: "text",
      value: {
        get(props) {
          const { data, focusArea } = props;
          let innerText = focusArea.ele.innerText;
          return innerText;
        },
        set(props, value) {
          const { data, focusArea } = props;
          const items = data.items;
          let innerText = focusArea.ele.innerText;
          const updateName = (items, innerText, value) => {
            items.forEach((item) => {
              if (item.label === innerText) {
                item.label = value;
              }
            });
          };
          updateName(items, innerText, value);
        },
      },
    },
  },
  ":root": {
    style: [
      {
        title: "表单项",
        options: ["font", "border", "padding", "margin", "background"],
        target: ".mybricks-field",
      },
      {
        title: "表单标题",
        options: ["size"],
        target: ".taroify-form-label",
      },
      {
        title: "提交按钮",
        options: ["border", "background", "font"],
        target: ".mybricks-submit .taroify-button",
      },
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "表单容器";
      cate0.items = [
        {
          title: "表单容器通用属性",
          items: [
            {
              title: "添加表单项",
              type: "comSelector",
              options: {
                schema: "mybricks.taro.formContainer/*",
                type: "add",
              },
              value: {
                set({ data, slot }: EditorResult<Data>, namespace: string) {
                  slot.get("content").addCom(namespace, false, {
                    deletable: true,
                    movable: true,
                  });
                },
              },
            },
            {
              title: "表单项布局",
              description:
                "水平：标题和表单项左右水平分布；垂直：标题和表单项上下垂直分布",
              type: "radio",
              options: [
                { label: "水平", value: "horizontal" },
                { label: "垂直", value: "vertical" },
              ],
              value: {
                get({ data }) {
                  return data.itemLayout || "horizontal";
                },
                set({ data }, val) {
                  data.itemLayout = val;
                },
              },
            },
            ...submitEditorItems,
          ],
        },
        {
          title: "表单事件",
          items: [
            {
              title: "表单提交时",
              type: "_event",
              options: {
                outputId: "onSubmit",
              },
            },
          ],
        },
      ];

      // cate1.title = "高级";
      // cate1.items = [
      //   {
      //     title: "修复",
      //     type: "button",
      //     value: {
      //       set({ data, style }) {
      //         style.height = "auto";
      //       },
      //     },
      //   },
      // ];
    },
  },
  ":child(mybricks.taro.formContainer/formItem)": {
    title: "表单项",
    items: [
      {
        title: "表单项通用属性",
        items: [
          {
            title: "隐藏标题",
            description: "开启后，表单项的标题将不会显示",
            type: "switch",
            value: {
              get({ id, data, name }: any) {
                const item = getFormItem(data.items, { id, name });
                return item?.hideLabel;
              },
              set({ id, data, name, input, output, slots }: any, val: boolean) {
                const item = getFormItem(data.items, { id, name });
                if (item) {
                  item.hideLabel = val;
                }
              },
            },
          },
          {
            title: "表单项布局",
            description:
              "跟随：根据表单容器的布局来确定表单项的布局；水平：标题和表单项左右水平分布；垂直：标题和表单项上下垂直分布",
            type: "radio",
            options: [
              { label: "跟随", value: "unset" },
              { label: "水平", value: "horizontal" },
              { label: "垂直", value: "vertical" },
            ],
            value: {
              get({ id, data, name }: any) {
                const item = getFormItem(data.items, { id, name });
                return item?.itemLayout || "unset";
              },
              set({ id, data, name, input, output, slots }, val) {
                const item = getFormItem(data.items, { id, name });
                if (item) {
                  item.itemLayout = val;
                }
              },
            },
          },
          {
            ifVisible({ id, data, name }) {
              const item = getFormItem(data.items, { id, name });
              return !item?.hideLabel;
            },
            title: "图标",
            description: "可在表单项标题前显示图标",
            type: "imageSelector",
            value: {
              get({ id, data, name }: any) {
                const item = getFormItem(data.items, { id, name });
                return item?.icon;
              },
              set({ id, name, data, slot }: any, val) {
                const item = getFormItem(data.items, { id, name });
                item.icon = val;
              },
            },
          },
          {
            ifVisible({ id, data, name }) {
              const item = getFormItem(data.items, { id, name });
              return !item?.hideLabel;
            },
            title: "标题",
            description: "表单项的标题",
            type: "text",
            value: {
              get({ id, data, name }: any) {
                const item = getFormItem(data.items, { id, name });
                return item?.label;
              },
              set({ id, name, data, slot }: any, val) {
                const item = getFormItem(data.items, { id, name });

                if (item) {
                  if (item.label === item.name) {
                    item.label = val;
                    item.name = val;
                  } else {
                    item.label = val;
                  }
                }
              },
            },
          },
          {
            title: "字段",
            description: "表单项的字段名，用于提交时的参数名",
            type: "text",
            value: {
              get({ id, data, name }: any) {
                const item = getFormItem(data.items, { id, name });
                return item?.name;
              },
              set({ id, data, name, input, output, slots }: any, val: string) {
                const item = getFormItem(data.items, { id, name });
                if (item) {
                  item.name = val;
                }
              },
            },
          },
          {
            title: "校验规则",
            description: "提供快捷校验配置",
            type: "ArrayCheckbox",
            options: {
              checkField: "status",

              visibleField: "visible",
              getTitle: (item) => {
                return item?.title;
              },
              items: [
                {
                  title: "提示文字",
                  type: "Text",
                  value: "message",
                  ifVisible(item: any, index: number) {
                    return item.key === RuleKeys.REQUIRED;
                  },
                },
                // {
                //   title: '编辑校验规则',
                //   type: 'code',
                //   options: {
                //     language: 'javascript',
                //     enableFullscreen: false,
                //     title: '编辑校验规则',
                //     width: 600,
                //     minimap: {
                //       enabled: false
                //     },
                //     babel: true,
                //     eslint: {
                //       parserOptions: {
                //         ecmaVersion: '2020',
                //         sourceType: 'module'
                //       }
                //     }
                //   },
                //   ifVisible(item: any, index: number) {
                //     return item.key === RuleKeys.CODE_VALIDATOR;
                //   },
                //   value: 'validateCode'
                // }
              ],
            },
            value: {
              get({ id, data, name }: any) {
                const item = getFormItem(data.items, { id, name });
                return item?.rules?.length > 0 ? item?.rules : defaultRules;
              },
              set({ id, data, name, input, output, slots }: any, val: string) {
                const item = getFormItem(data.items, { id, name });
                if (item) {
                  item.rules = val;
                }
              },
            },
          },
          {
            title: "隐藏当前项",
            description:
              "隐藏后仅仅是不展示，依然可以能获取和设置当前表单项的数据",
            type: "switch",
            value: {
              get({ id, data, name }: any) {
                const item = getFormItem(data.items, { id, name });

                return item?.hidden;
              },
              set({ id, data, name, input, output, slots }: any, val: boolean) {
                const item = getFormItem(data.items, { id, name });
                if (item) {
                  item.hidden = val;
                }
              },
            },
          },
        ],
      },
    ],
    style: [
      {
        title: "表单项",
        options: ["font", "border", "padding", "margin", "background"],
        target: ".mybricks-field",
      },
      {
        title: "图标",
        options: ["size", "margin"],
        target: ".taroify-cell__icon",
      },
      {
        title: "标题",
        options: ["font"],
        target: ".taroify-cell__title",
      },
    ],
  },
  ".mybricks-submit": {
    "@dblclick": {
      type: "text",
      value: {
        get({ data }) {
          return data.submitButtonText;
        },
        set({ data }, value) {
          data.submitButtonText = value;
        },
      },
    },
    style: [
      {
        title: "提交按钮",
        options: ["border", "background", "font"],
        target: ".mybricks-submit .taroify-button",
      },
    ],
    items: [...submitEditorItems],
  },
};
