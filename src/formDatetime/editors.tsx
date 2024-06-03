import DatePicker from './editor/datePicker'

const LAST_TEN_YEAR = new Date(
  new Date().setFullYear(new Date().getFullYear() - 10)
);
const AFTER_TEN_YEAR = new Date(
  new Date().setFullYear(new Date().getFullYear() + 10)
);

export const setSlotLayout = (slot, val) => {
  if (!slot) return;
  if (val.position === "smart") {
    slot.setLayout("smart");
  } else if (val.position === "absolute") {
    slot.setLayout(val.position);
  } else if (val.display === "flex") {
    if (val.flexDirection === "row") {
      slot.setLayout("flex-row");
    } else if (val.flexDirection === "column") {
      slot.setLayout("flex-column");
    }
  }
};

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
    style: [],
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
            set({ data, slot , style }, value) {
              data.isSlot = value;
              if (value) {
                const slotInstance = slot.get("content");
                setSlotLayout(slotInstance, data.slotStyle);
                style.height = 50;
                style.width = 50;
              }
            },
          },
        },
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

        {
          title: "当值变化",
          type: "_event",
          options: {
            outputId: "onChange",
          },
        },
      ];
    },
  },
};
