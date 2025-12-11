export default {
  "@init": ({ style, data }) => {
    style.width = "100%";
    style.height = "auto";
  },
  "@resize": {
    options: ["width"],
  },
  ":root": {
    style: [
      {
        title: "工具条",
        options: ["border", "padding", "background"],
        target({ id }) {
          return [`.mybricks-toolbar`];
        },
      },
      {
        title: "输入框",
        options: ["border", "size", "padding", "background"],
        target({ id }) {
          return [`.mybricks-editor`];
        },
      },
    ],
    items: ({ data, slots, inputs, output, style }, cate0, cate1, cate2) => {
      cate0.title = "富文本编辑器";
      cate0.items = [
        {
          title: "基础属性",
          items: [
            {
              title: "提示内容",
              description: "该提示内容会在值为空时显示",
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
              title: "显示撤销重做",
              description: "是否显示撤销重做按钮",
              type: "Switch",
              value: {
                get({ data }) {
                  return data.showUndoRedo;
                },
                set({ data }, value) {
                  data.showUndoRedo = value;
                },
              },
            },
            {
              title: "单次图片上传数",
              description: "每次上传图片时最多可以上传的图片数量",
              type: "number",
              value: {
                get({ data }) {
                  return data.maxImageCount;
                },
                set({ data }, value) {
                  data.maxImageCount = value;
                },
              },
            },
            {
              title: "添加自定义插件",
              type: "array",
              options: {
                getTitle: (item, index) => {
                  return [item.title];
                },
                onAdd(_id) {
                  let title = `自定义插件${_id}`;

                  slots.add({
                    id: _id,
                    title,
                    type: "scope",
                    inputs: [
                      {
                        id: "onClick",
                        title: "点击图标",
                        schema: {
                          type: "any",
                        },
                      },
                    ],
                    outputs: [
                      {
                        id: "insert",
                        title: "插入",
                        schema: {
                          type: "object",
                          properties: {
                            src: {
                              type: "string",
                              description: "图片地址",
                            },
                            data: {
                              type: "object",
                              description:
                                "自定义数据，data 被序列化为 name=value;name1=value2 的格式挂在属性 data-custom 上",
                            },
                          },
                        },
                      },
                    ],
                  });

                  return {
                    title,
                    icon: "data:image/svg+xml;base64,PHN2ZyB0PSIxNzI0MzkzOTc3NjI3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjUyODMiIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4Ij48cGF0aCBkPSJNNTc2IDMyQTE2MCAxNjAgMCAwIDEgNzM2IDE5Mkg4OTZhNjQgNjQgMCAwIDEgNjQgNjR2NjQwYTY0IDY0IDAgMCAxLTY0IDY0aC0yMzQuMjR2LTEwNC4zMmE4Ny42OCA4Ny42OCAwIDAgMC03OS4yMzItODcuMjk2TDU3NC4wOCA3NjhhODcuNjggODcuNjggMCAwIDAtODcuNjggODcuNjhWOTYwSDI1NmE2NCA2NCAwIDAgMS02NC02NHYtMTYwYTE2MCAxNjAgMCAxIDEgMC0zMjBWMjU2YTY0IDY0IDAgMCAxIDY0LTY0aDE2MEExNjAgMTYwIDAgMCAxIDU3NiAzMnogbTAgNzQuMjRjLTQ3LjM2IDAtODUuNzYgMzguNC04NS43NiA4NS43NnY3NC4yNGgtMjExLjJhMTIuOCAxMi44IDAgMCAwLTEyLjggMTIuOHYyMTEuMkgxOTJhODUuNzYgODUuNzYgMCAwIDAgMCAxNzEuNTJoNzQuMjR2MjExLjJjMCA3LjA0IDUuNzYgMTIuOCAxMi44IDEyLjhoMTMzLjEydi0zMC4wOGMwLTg1LjgyNCA2Ni44MTYtMTU2LjA5NiAxNTQuMzY4LTE2MS40NzJsMTEuMDcyLTAuMzg0IDExLjk2OCAwLjY0QTE2MS45MiAxNjEuOTIgMCAwIDEgNzM2IDg1NS42OHYzMC4wOGgxMzYuOTZhMTIuOCAxMi44IDAgMCAwIDEyLjgtMTIuOFYyNzkuMDRhMTIuOCAxMi44IDAgMCAwLTEyLjgtMTIuOGgtMjExLjJWMTkyYzAtNDcuMzYtMzguNC04NS43Ni04NS43Ni04NS43NnoiIGZpbGw9IiMwMDAwMDAiIHAtaWQ9IjUyODQiPjwvcGF0aD48L3N2Zz4=",
                  };
                },
                onRemove(_id) {
                  slots.remove(_id);
                },
                items: [
                  {
                    title: "名称",
                    type: "text",
                    value: "title",
                  },
                  {
                    title: "图标",
                    type: "imageSelector",
                    value: "icon",
                  },
                ],
              },
              value: {
                get({ data }) {
                  return data.plugins;
                },
                set({ data }, value) {
                  data.plugins = value;

                  // 更新插槽
                  value.forEach((plugin) => {
                    let slot = slots.get(plugin._id);
                    if (slot) {
                      slot.setTitle(plugin.title);
                    }
                  });
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
            {
              title: "当失去焦点",
              type: "_event",
              options: {
                outputId: "onBlur",
              },
            },
          ],
        },
      ];
    },
  },
  ".mybricks-boldIcon": {
    style: [
      {
        title: "文字加粗图标",
        options: ["size"],
        target: ".mybricks-boldIcon",
      },
    ],
    items: [
      {
        title: "图标修改",
        type: "imageSelector",
        value: {
          get({ data }) {
            return data.boldIconUrl;
          },
          set({ data }, value) {
            data.boldIconUrl = value;
          },
        },
      },
    ],
  },
  ".mybricks-imgIcon": {
    style: [
      {
        title: "图片选择图标",
        options: ["size"],
        target: ".mybricks-imgIcon",
      },
    ],
    items: [
      {
        title: "图标修改",
        type: "imageSelector",
        value: {
          get({ data }) {
            return data.imgIconUrl;
          },
          set({ data }, value) {
            data.imgIconUrl = value;
          },
        },
      },
    ],
  },
  ".mybricks-backward": {
    style: [
      {
        title: "后退图标",
        options: ["size"],
        target: ".mybricks-backwardIcon",
      },
    ],
    items: [
      {
        title: "图标修改",
        type: "imageSelector",
        value: {
          get({ data }) {
            return data.backwardIconUrl;
          },
          set({ data }, value) {
            data.backwardIconUrl = value;
          },
        },
      },
    ],
  },
  ".mybricks-forward": {
    style: [
      {
        title: "后退图标",
        options: ["size"],
        target: ".mybricks-forwardIcon",
      },
    ],
    items: [
      {
        title: "图标修改",
        type: "imageSelector",
        value: {
          get({ data }) {
            return data.forwardIconUrl;
          },
          set({ data }, value) {
            data.forwardIconUrl = value;
          },
        },
      },
    ],
  },
};
