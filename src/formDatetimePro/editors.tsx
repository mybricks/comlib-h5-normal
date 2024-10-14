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
      }
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "常规";
      cate0.items = [
        {
          title: "配置为插槽",
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
        {
          title:"提示内容",
          type: "text",
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
          title:"弹窗选择器标题",
          type: "text",
          value: {
            get({ data }) {
              return data.selectorTitle;
            },
            set({ data }, value) {
              data.selectorTitle = value;
            },
          },
        },
        {
          title: "时间类型",
          type: "select",
          options: [
            { label: "日期", value: "date" },
            { label: "时间", value: "time" },
            { label: "年-月", value: "year-month" },
            { label: "年-月-日-小时", value: "date-hour" },
            { label: "完整时间", value: "datetime" },
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
          title: "时间范围",
          items: [
            {
              title: "可选的最小时间",
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
          ],
        },
        {
          title: "当值变化",
          type: "_event",
          options: {
            outputId: "onChange",
          },
        },
        {
          title: "当点击确认",
          type: "_event",
          options: {
            outputId: "onConfirm",
          },
        },
      ];
    },
  },
};
