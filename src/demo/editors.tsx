import ActivityCode from "./editors/activityCode";

// 抽奖按钮的编辑项
const mybricksSpinButtonEditors = [
  {
    title: "抽奖按钮图",
    type: "imageSelector",
    value: {
      get({ data }) {
        return data.drawBtnSrc;
      },
      set({ data }, value) {
        data.drawBtnSrc = value;
      },
    },
  },
];

export default {
  "@init"({ data, style }) {
    style.height = `${364}px`;
  },
  ":root": {
    items: [
      {
        title: "活动玩法",
        type: "editorRender",
        options: {
          render: ({ editConfig }) => {
            return <ActivityCode value={editConfig.value}></ActivityCode>;
          },
        },
        value: {
          get({ data }) {
            return data.activityCode;
          },
          set({ data }, value) {
            data.activityCode = value;
          },
        },
      },
      {
        title: "奖项列表",
        description: "从左上角开始，依次向右，再向下",
        type: "array",
        options: {
          addable: false,
          deletable: false,
          getTitle: (item, index) => {
            return [`活动奖项：${item.awardId || "暂未设置"}`];
          },
          items: [
            {
              title: "活动奖项",
              type: "text",
              value: "awardId",
            },
            {
              title: "输出值",
              type: "imageSelector",
              value: "awardSrc",
            },
          ],
        },
        value: {
          get({ data }) {
            return data.couponList;
          },
          set({ data }, value) {
            data.couponList = value;
          },
        },
      },

      ...mybricksSpinButtonEditors,

      {
        title: "抽奖背景图",
        description: "配置九宫格区域背景图片",
        type: "imageSelector",
        value: {
          get({ data }) {
            return data.bgSrc;
          },
          set({ data, style, styles }, value) {
            data.bgSrc = value;

            // 在设置背景图的时候，自动根据背景图的尺寸设置组件的宽高
            const img = new Image();
            img.onload = () => {
              const { width, height } = img;
              style.height = Math.round((375 / width) * height);
            };
            img.src = value;
          },
        },
      },
      {
        title: "错误提示弹窗",
        type: "array",
        options: {
          getTitle: (item, index) => {
            return [`提示编码：${item.code || "暂未设置"}`];
          },
          onAdd() {
            return {
              code: "",
              channel: "",
              title: "",
              src: "",
              content: "",
              desc: "",
            };
          },
          items: [
            {
              title: "提示编码",
              type: "text",
              value: "code",
            },
            {
              title: "展示渠道",
              type: "text",
              value: "channel",
            },
            {
              title: "弹窗标题",
              type: "text",
              value: "title",
            },
            {
              title: "弹窗图片",
              type: "imageSelector",
              value: "src",
            },
            {
              title: "弹窗主文案",
              type: "text",
              value: "content",
            },
            {
              title: "弹窗副文案",
              type: "text",
              value: "desc",
            },
          ],
        },
        value: {
          get({ data }) {
            return data.errorList;
          },
          set({ data }, value) {
            data.errorList = value;
          },
        },
      },
      {
        title: "成功提示弹窗",
        type: "array",
        options: {
          getTitle: (item, index) => {
            return [`提示编码：${item.code || "暂未设置"}`];
          },
          onAdd() {
            return {
              code: "",
              channel: "",
              title: "",
              src: "",
              content: "",
              desc: "",
            };
          },
          items: [
            {
              title: "提示编码",
              type: "text",
              value: "code",
            },
            {
              title: "展示渠道",
              type: "text",
              value: "channel",
            },
            {
              title: "弹窗标题",
              type: "text",
              value: "title",
            },
            {
              title: "弹窗图片",
              type: "imageSelector",
              value: "src",
            },
            {
              title: "弹窗主文案",
              type: "text",
              value: "content",
            },
            {
              title: "弹窗副文案",
              type: "text",
              value: "desc",
            },
          ],
        },
        value: {
          get({ data }) {
            return data.successList;
          },
          set({ data }, value) {
            data.successList = value;
          },
        },
      },
    ],
  },
  ".coupon.active": {
    title: "光标",
    style: [
      {
        options: ["border", "background"],
        target: ".coupon.active",
      },
    ],
  },
  ".mybricks-spin-button": {
    title: "抽奖按钮",
    items: [...mybricksSpinButtonEditors],
  },
};
