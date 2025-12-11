import DatePicker from "./editor/datePicker";
import setSlotLayout from "../utils/setSlotLayout";

const LAST_TEN_YEAR = new Date(
  new Date().setFullYear(new Date().getFullYear() - 10)
);
const AFTER_TEN_YEAR = new Date(
  new Date().setFullYear(new Date().getFullYear() + 10)
);

export default {
  "@init": ({ style, data }) => {
    style.width = "100%";
    style.height = "auto";
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":slot": {},
  ":root": {
    style: [
      {
        title: "样式",
        options: ["border", "background"],
        target: `.mybricks-datetime`,
      },
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "时间选择";
      cate0.items = [
        {
          title: "基础属性",
          items: [
            {
              title: "提示内容",
              description: "该提示内容会在值为空时显示",
              type: "text",
              ifVisible({ data }) {
                return !data.isSlot;
              },
              value: {
                get({ data }) {
                  return data.placeholder;
                },
                set({ data }, value) {
                  data.placeholder = value;
                },
              },
            },
            {
              title: "时间类型",
              description: "选择要显示的时间类型",
              type: "select",
              options: [
                { label: "日期", value: "date" },
                { label: "时间", value: "time" },
                { label: "年", value: "year" },
                { label: "年-月", value: "year-month" },
                // { label: "月-日", value: "month-day" },
                // { label: "日期 小时", value: "date-hour" },
                // { label: "日期 小时:分", value: "date-minute" },
                // { label: "小时:分", value: "hour-minute" },
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
            {
              title: "输出日期格式",
              description: "选择要输出的日期格式",
              type: "select",
              ifVisible({ data }) {
                return data.type == "date";
              },
              options: [
                { label: "时间戳", value: "timestamp" },
                { label: "YYYY-MM-DD", value: "YYYY-MM-DD" },
              ],
              value: {
                get({ data }) {
                  return data.outputType;
                },
                set({ data }, value) {
                  data.outputType = value;
                },
              },
            },
            {
              title: "禁用编辑",
              description: "是否禁用编辑",
              type: "Switch",
              value: {
                get({ data }) {
                  return data.disabled;
                },
                set({ data }, value) {
                  data.disabled = value;
                },
              },
            },
          ],
        },
        {
          title: "高级属性",
          items: [
            {
              title: "开启清空按钮",
              description: "可点击图标清除所选时间",
              type: "switch",
              value: {
                get({ data }) {
                  return data.clearable;
                },
                set({ data }, value) {
                  data.clearable = value;
                },
              },
            },
            {
              title: "可选的最小时间",
              description: "选择可选的最小时间",
              type: "editorRender",
              options: {
                render: DatePicker,
              },
              value: {
                get({ data }) {
                  return data.min;
                },
                set({ data }, value) {
                  data.min = value;
                },
              },
            },
            {
              title: "可选的最大时间",
              description: "选择可选的最大时间",
              type: "editorRender",
              options: {
                render: DatePicker,
              },
              value: {
                get({ data }) {
                  return data.max;
                },
                set({ data }, value) {
                  data.max = value;
                },
              },
            },
            {
              title: "配置为插槽",
              description: "开启后可自定义时间选择的触发区域",
              type: "switch",
              value: {
                get({ data }) {
                  return data.isSlot;
                },
                set({ data, slot, style }, value) {
                  data.isSlot = value;
                  if (value) {
                    // const slotInstance = slot.get("content");
                    // setSlotLayout(slotInstance, data.slotStyle);
                    style.height = 50;
                    style.width = 50;
                  } else {
                    style.height = 24;
                    style.width = 375;
                  }
                },
              },
            },
          ],
        },
        {
          title: "事件",
          items: [
            {
              title: "当值变化",
              type: "_event",
              options: {
                outputId: "onChange",
              },
            },
          ],
        },

        // {
        //   title: '时间范围',
        //   type: 'editorRender',
        //   description: '只有时间范围内的时间可以被选择',
        //   options: {
        //     render: DatePicker,
        //   },
        //   value: {
        //     get({ data, style }) {
        //       if (data.min == '' && data.max == '') {
        //         return [LAST_TEN_YEAR.getTime(), AFTER_TEN_YEAR.getTime()]
        //       }
        //       return [data.min, data.max]
        //     },
        //     set({}, value) {
        //     //  data.mode = value
        //     }
        //   }
        // },
      ];
    },
  },
};
