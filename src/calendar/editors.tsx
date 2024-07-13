import DatePicker from "./editor/datePicker";
import { CalendarType } from "./types";

export default {
  "@init"({ style, data, ...opt }) {
    style.width = 375;
    style.height = 375;
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":root": {
    style: [
      {
        title: "标题",
        options: ["font"],
        target: ".mybricks-calendar .taroify-calendar__header-subtitle",
      },
    ],
    items({ data, slot }, cate0, cate1, cate2) {
      cate0.title = "常规";
      cate0.items = [
        {
          title: "选择类型",
          type: "select",
          options: [
            {
              label: "选择单个日期",
              value: CalendarType.Single,
            },
            {
              label: "选择日期范围",
              value: CalendarType.Range,
            },
            // {
            //   label: '选择多个日期',
            //   value: CalendarType.Mutiple,
            // }
          ],
          value: {
            get({ data }) {
              return data.type;
            },
            set({ data }, value) {
              data.type = value;
            },
          },
        },
        {},
        {
          title: "事件",
          items: [
            {
              title: "当选择日期时",
              type: "_event",
              options: {
                outputId: "onSelect",
              },
            },
            {
              title: "当选择完毕时",
              type: "_event",
              options: {
                outputId: "onConfirm",
              },
            },
          ],
        },
      ];

      cate1.title = "高级";
      cate1.items = [
        {
          title: "升级",
          type: "button",
          value: {
            set({ data, inputs, outputs }) {
              if (inputs.get("setCustomRange")) {
                return;
              }

              inputs.add({
                id: "setCustomRange",
                title: "设置自定义日期范围",
                schema: {
                  type: "object",
                  properties: {
                    min: {
                      type: "string",
                      title: "可选择的最小日期",
                    },
                    max: {
                      type: "string",
                      title: "可选择的最大日期",
                    },
                  },
                },
              });

              outputs.add({
                id: "afterSetCustomRange",
                title: "设置自定义日期范围后",
                schema: {
                  type: "any"
                }
              });

              inputs.get("setCustomRange").setRels(["afterSetCustomRange"]);
            },
          },
        },
      ];
    },
  },
};
