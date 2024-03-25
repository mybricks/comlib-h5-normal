import { getFormItem } from "./utils";
import { DynamicArrayData } from './../utils/dynamic-array'
import { FormItems, Data, RuleKeys } from "./types";
import comJson from './com.json'

const getScopeSlot = ({ id, title }) => {
  return {
    ...comJson.slots[0],
    id,
    title
  }
}


// const ScopeSlotInputs = comJson.slots[0].inputs;
const dynamicArrayData = new DynamicArrayData({ keyName: 'cates' });

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

export default {
  ":slot": {},
  "@init": ({ style, data }) => {
    style.width = "100%";
  },
  "@resize": {
    options: ["width"],
  },
  // "@childAdd"({ data, inputs, outputs, logs, slots }, child, curSlot) {
  //   if (curSlot.id === "content") {
  //     const { id, inputDefs, outputDefs, name } = child;
  //     if (!Array.isArray(data.items)) {
  //       data.items = [];
  //     }
  //     const item = data.items.find((item) => item.id === id);
  //     // const com = outputDefs.find((item) => item.id === 'returnValue');

  //     if (isNaN(data.nameCount)) {
  //       data.nameCount = 0;
  //     }

  //     const label = `表单项${++data.nameCount}`;

  //     if (item) {
  //       // item.schema = com.schema;
  //     } else {
  //       data.items.push({
  //         id,
  //         comName: name,
  //         // schema: com.schema,
  //         name: label,
  //         label: label,
  //         hidden: false,
  //         rules: [],
  //       });
  //     }
  //   }
  // },
  // "@childRemove"({ data, inputs, outputs, logs, slots }, child) {
  //   const { id, name, title } = child;

  //   data.items = data.items.filter((item) => {
  //     if (item?.comName) {
  //       return item.comName !== name;
  //     }

  //     return item.id !== id;
  //   });

  //   // refreshSchema({ data, inputs, outputs, slots });
  // },
  ":root": {
    style: [
      // {
      //   title: "表单项",
      //   options: ["font", "border", "padding", "background"],
      //   target: ".mybricks-field",
      // },
      // {
      //   title: "提交按钮",
      //   options: ["border", "background", "font"],
      //   target: ".mybricks-submit .taroify-button",
      // },
    ],
    items: ({ data, slot, output, style }, cate0, cate1, cate2) => {
      cate0.title = "常规";
      cate0.items = [
        dynamicArrayData.editors({ data }, {
          title: '筛选项分类',
          array: {
            options: {
              selectable: true,
              getTitle: (item, index) => {
                return [`${item.label || ""}`];
              },
              onAdd() {
                let defaultItem = {
                  label: "筛选项",
                };
                return defaultItem;
              },
              onSelect(_id, index) {
                if (index !== -1) {
                  data.edit.currentTabId = data.cates[index]?._id;
                }
              },
              items: [
                {
                  title: "名称",
                  type: "text",
                  value: "label",
                },
                // {
                //   title:"tab图标(可选)",
                //   type:"imageSelector",
                //   value:"tabPic"
                // },
                // {
                //   title:"tab图标-选中(可选)",
                //   type:"imageSelector",
                //   value:"tabPicActive"
                // }
              ],
            }
          },
          effects: {
            onRemove: ({ slot }, action) => {
              slot.remove(action?.value._id);
            },
            onAdd: ({ slot }, action) => {
              slot.add(getScopeSlot({ id: action?.value._id, title: action?.value.label }));
            },
            onUpdate: ({ slot }, action) => {
              slot.setTitle(action?.value._id, action?.value.label);
            },
            // onSwitchToDynamic: (datasource) => {
            //   // 增加动态插槽
            //   if (!slot.get('item')) {
            //     slot.add({ id: 'item', title: '内容项', type: 'scope', inputs: ScopeSlotInputs })
            //   }
            //   // 删除静态插槽
            //   datasource.forEach(item => {
            //     slot.remove(item._id);
            //   });
            // },
            // onSwitchToStatic: (datasource) => {
            //   // 增加静态插槽
            //   datasource.forEach(item => {
            //     if (!slot.get(item._id)) {
            //       slot.add({ id: item._id, title: item.tabName, type: 'scope', inputs: ScopeSlotInputs })
            //     }
            //   });
            //   // 删除动态插槽
            //   slot.remove('item');
            // }
            // onSwitchTo
          }
        }),
        // {
        //   title: "添加表单项",
        //   type: "comSelector",
        //   options: {
        //     schema: "mybricks.taro.formContainer/*",
        //     type: "add",
        //   },
        //   value: {
        //     set({ data, slot }: EditorResult<Data>, namespace: string) {
        //       slot
        //         .get("content")
        //         .addCom(namespace, false, { deletable: true, movable: true });
        //     },
        //   },
        // },
      ];
    },
  },
  // ":child(mybricks.taro.formContainer/formItem)": {
  //   title: "表单项",
  //   items: [
  //     {
  //       title: "隐藏标题",
  //       type: "switch",
  //       value: {
  //         get({ id, data, name }: any) {
  //           const item = getFormItem(data.items, { id, name });
  //           return item?.hideLabel;
  //         },
  //         set({ id, data, name, input, output, slots }: any, val: boolean) {
  //           const item = getFormItem(data.items, { id, name });
  //           if (item) {
  //             item.hideLabel = val;
  //           }
  //         },
  //       },
  //     },
  //     {
  //       title: "标题",
  //       type: "text",
  //       value: {
  //         get({ id, data, name }: any) {
  //           const item = getFormItem(data.items, { id, name });
  //           return item?.label;
  //         },
  //         set({ id, name, data, slot }: any, val) {
  //           const item = getFormItem(data.items, { id, name });

  //           if (item) {
  //             if (item.label === item.name) {
  //               item.label = val;
  //               item.name = val;
  //             } else {
  //               item.label = val;
  //             }
  //           }
  //         },
  //       },
  //     },
  //     {
  //       title: "字段",
  //       type: "text",
  //       value: {
  //         get({ id, data, name }: any) {
  //           const item = getFormItem(data.items, { id, name });
  //           return item?.name;
  //         },
  //         set({ id, data, name, input, output, slots }: any, val: string) {
  //           const item = getFormItem(data.items, { id, name });
  //           if (item) {
  //             item.name = val;
  //           }
  //         },
  //       },
  //     },
  //     {
  //       title: "校验规则",
  //       description: "提供快捷校验配置",
  //       type: "ArrayCheckbox",
  //       options: {
  //         checkField: "status",

  //         visibleField: "visible",
  //         getTitle: (item) => {
  //           return item?.title;
  //         },
  //         items: [
  //           {
  //             title: "提示文字",
  //             type: "Text",
  //             value: "message",
  //             ifVisible(item: any, index: number) {
  //               return item.key === RuleKeys.REQUIRED;
  //             },
  //           },
  //           // {
  //           //   title: '编辑校验规则',
  //           //   type: 'code',
  //           //   options: {
  //           //     language: 'javascript',
  //           //     enableFullscreen: false,
  //           //     title: '编辑校验规则',
  //           //     width: 600,
  //           //     minimap: {
  //           //       enabled: false
  //           //     },
  //           //     babel: true,
  //           //     eslint: {
  //           //       parserOptions: {
  //           //         ecmaVersion: '2020',
  //           //         sourceType: 'module'
  //           //       }
  //           //     }
  //           //   },
  //           //   ifVisible(item: any, index: number) {
  //           //     return item.key === RuleKeys.CODE_VALIDATOR;
  //           //   },
  //           //   value: 'validateCode'
  //           // }
  //         ],
  //       },
  //       value: {
  //         get({ id, data, name }: any) {
  //           const item = getFormItem(data.items, { id, name });
  //           return item?.rules?.length > 0 ? item?.rules : defaultRules;
  //         },
  //         set({ id, data, name, input, output, slots }: any, val: string) {
  //           const item = getFormItem(data.items, { id, name });
  //           if (item) {
  //             item.rules = val;
  //           }
  //         },
  //       },
  //     },
  //     {
  //       title: "隐藏当前项",
  //       description: "隐藏后仅仅是不展示，依然可以能获取和设置当前表单项的数据",
  //       type: "switch",
  //       value: {
  //         get({ id, data, name }: any) {
  //           const item = getFormItem(data.items, { id, name });

  //           return item?.hidden;
  //         },
  //         set({ id, data, name, input, output, slots }: any, val: boolean) {
  //           const item = getFormItem(data.items, { id, name });
  //           if (item) {
  //             item.hidden = val;
  //           }
  //         },
  //       },
  //     },
  //     {},
  //   ],
  // }
};
