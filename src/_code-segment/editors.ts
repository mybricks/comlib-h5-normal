import { CODE_TEMPLATE, COMMENTS, Data } from "./constants";

let outputId = "";

export default {
  "@init"({ data, isAutoRun }: EditorResult<Data>) {
    if (isAutoRun()) {
      data.runImmediate = true;
    }
    if (!data.fns) {
      data.fns = encodeURIComponent(CODE_TEMPLATE);
    }
  },
  ":root": [
    {
      title: "自定义 outputId",
      ifVisible({ data }) {
        return data.advanced;
      },
      type: "text",
      value: {
        get: ({ data }) => {
          return outputId;
        },
        set({ data }, value: string) {
          outputId = value;
        },
      },
    },
    {
      title: "添加输出项",
      type: "Button",
      value: {
        set({ data, output }: EditorResult<Data>) {
          let idx = getOutputOrder({ data, output });
          let title = `输出项${idx}`;
          let hostId = `output${idx}`;

          // 高级模式下，必须设置 outputId，且不为空
          if (data.advanced) {
            if (!isUnique({ outputId: outputId, output })) {
              alert("请输入唯一的 outputId");
              return;
            }

            title = `输出项${outputId}`;
            hostId = `${outputId}`;
            outputId = "";
          }

          output.add(hostId, title, { type: "follow" }, true, 1);
        },
      },
    },
    {
      title: "高级模式",
      type: "switch",
      value: {
        get({ data }) {
          return data.advanced;
        },
        set({ data }, value) {
          data.advanced = value;
        },
      },
    },
    {
      type: "code",
      options: {
        comments: COMMENTS,
        theme: "light",
        suggestions: {
          context: [
            {
              label: "weblog",
              value: `weblog.collect("SHOW", {})`,
              kind: 1,
              detail: "埋点上报",
            },
            {
              label: "ajax",
              value: `ajax('/aaa', {})`,
              kind: 1,
              detail: "发送请求",
            },
          ],
        },
        minimap: {
          enabled: false,
        },
        eslint: {
          parseOptions: {
            ecmaVersion: "2020",
            sourceType: "module",
          },
        },
      },
      title: "代码编辑",
      value: {
        get({ data }: EditorResult<Data>) {
          return data.fns || CODE_TEMPLATE;
        },

        set({ data }: EditorResult<Data>, fns) {
          data.fns = fns;
        },
      },
    },
  ],
};

function getOutputOrder({ data, output }) {
  if (data.outputCount === void 0) {
    const c = Object.keys(output.get()).length;
    data.outputCount = c;
  }
  return data.outputCount++;
}

function isUnique({ outputId, output }) {
  if (!outputId) {
    return false;
  }

  let isExist = !!output.get().filter((raw) => {
    return raw.id === outputId;
  }).length;

  return !isExist;
}
