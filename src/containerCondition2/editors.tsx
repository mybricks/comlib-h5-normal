import { uuid } from "../utils";
import css from "./editors.less";
import comJson from "./com.json";

const ScopeSlotInputs = comJson.slots[0].inputs;

function getItem({ data, focusArea }) {
  if (!focusArea) return {};
  const index = focusArea.index;
  const item = data.items[index];
  return item;
}

function findItemByInnerId(_id, data) {
  return data.items.find((t) => t._id === _id) ?? {};
}

export default {
  "@init"({ style, data, slots }) {
    style.width = "100%";
    // style.height = "auto";
  },
  "@resize": {
    options: ["width"],
  },
  ":slot": {},
  ":root"({ data, output, input, style, slots }, cate0, cate1, cate2) {
    cate0.title = "条件容器";
    cate0.items = [
      {
        title: "基础属性",
        items: [
          {
            title: "条件列表",
            type: "array",
            description: "点击可切换展示的条件",
            options: {
              getTitle: (item, index) => {
                return [item.title];
              },
              onAdd() {
                const uid = uuid("", 5);
                const id = `condition_${uid}`;
                const title = `条件${data.new_index++}`;
                const outputId = `changeCondition_${uid}`;

                slots.add({
                  id,
                  title,
                  // type: "scope",
                  // inputs: ScopeSlotInputs,
                });

                input.add({
                  id: id,
                  title: `切换到 ${title}`,
                  schema: {
                    type: "any",
                  },
                  rels: ["changeDone"],
                });

                input.get(id).setRels(["changeDone"]);

                output.add({
                  id: `changeCondition_${uid}`,
                  title: `切换到 ${title}`,
                  schema: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
                      tabName: {
                        type: "string",
                      },
                      index: {
                        type: "number",
                      },
                    },
                  },
                });

                return {
                  id,
                  title,
                  outputId,
                };
              },
              onSelect(_id) {
                data._editSelectId_ =
                  findItemByInnerId(_id, data)?.id ?? data._editSelectId_;
                data._editSelectOutputId_ =
                  findItemByInnerId(_id, data)?.outputId ??
                  data._editSelectOutputId_;
              },
              onRemove(_id) {
                const id = findItemByInnerId(_id, data)?.id;
                const outputId = findItemByInnerId(_id, data)?.outputId;
                input.remove(id);
                slots.remove(id);
                output.remove(outputId);

                if (id === data.defaultActiveId) {
                  data.defaultActiveId = undefined;
                }
              },
              customOptRender({ item, setList }) {
                return (
                  <div className={css.my_edit}>
                    {data._editSelectId_ === item.id && (
                      <div className={css.selected_title}>当前条件</div>
                    )}
                    <div
                      className={css.edit}
                      onClick={(e) => {
                        e.stopPropagation();

                        const title = window.prompt(
                          "请输入新的条件名称",
                          item.title
                        );

                        // 重复 title 校验
                        if (
                          title &&
                          data.items.some((t) => t.title === title)
                        ) {
                          alert("条件名称重复，请重新输入");
                          return;
                        }

                        if (title) {
                          input.get(item.id).setTitle(`切换到 ${title}`);
                          slots.get(item.id).setTitle(title);

                          setList((c) =>
                            c.map((t) => {
                              if (t.id === item.id) {
                                return {
                                  ...t,
                                  title,
                                };
                              }
                              return t;
                            })
                          );
                        }
                      }}
                    >
                      <svg viewBox="0 0 1024 1024" width="15" height="15">
                        <path
                          d="M341.108888 691.191148 515.979638 616.741529 408.633794 511.126097 341.108888 691.191148Z"
                          p-id="5509"
                        ></path>
                        <path
                          d="M860.525811 279.121092 749.7171 164.848489 428.544263 481.69274 543.68156 601.158622 860.525811 279.121092Z"
                          p-id="5510"
                        ></path>
                        <path
                          d="M951.813934 142.435013c0 0-29.331026-32.462343-63.091944-57.132208-33.759895-24.670889-59.729359 0-59.729359 0l-57.132208 57.132208 115.996874 115.565039c0 0 48.909943-49.342802 63.957661-66.222237C966.861652 174.897356 951.813934 142.435013 951.813934 142.435013L951.813934 142.435013z"
                          p-id="5511"
                        ></path>
                        <path
                          d="M802.174845 946.239985 176.165232 946.239985c-61.635779 0-111.786992-50.151213-111.786992-111.786992L64.37824 208.443379c0-61.635779 50.151213-111.786992 111.786992-111.786992l303.856449 0c12.357446 0 22.357194 10.011005 22.357194 22.357194s-9.999748 22.357194-22.357194 22.357194L176.165232 141.370775c-36.986379 0-67.072605 30.086226-67.072605 67.072605l0 626.009613c0 36.986379 30.086226 67.072605 67.072605 67.072605l626.009613 0c36.985356 0 67.072605-30.086226 67.072605-67.072605L869.24745 530.596544c0-12.347213 9.999748-22.357194 22.357194-22.357194s22.357194 10.011005 22.357194 22.357194l0 303.856449C913.961838 896.088772 863.810624 946.239985 802.174845 946.239985z"
                          p-id="5512"
                        ></path>
                      </svg>
                    </div>
                  </div>
                );
              },
              editable: false,
              draggable: false,
              selectable: true,
              items: [],
            },
            value: {
              get({ data }) {
                return data.items;
              },
              set({ data, slot }, value) {
                data.items = value;
              },
            },
          },
          {
            title: "默认展示条件",
            description: "初始化时，默认展示的条件",
            type: "select",
            options: [
              {
                label: "无",
                value: "none",
              },
            ].concat(
              (data.items ?? []).map((item) => ({
                label: item.title,
                value: item.id,
              }))
            ),
            value: {
              get({ data }) {
                return data.defaultActiveId ?? "none";
              },
              set({ data, slot }, value) {
                data.defaultActiveId = value === "none" ? undefined : value;
              },
            },
          },
        ],
      },

      {
        title: "高级属性",
        items: [
          {
            title: "开启预渲染",
            description:
              "开启后所有条件的内容都会提前渲染，切换条件只影响内容显示",
            type: "switch",
            value: {
              get({ data }) {
                return data.renderMode ? data.renderMode === "pre" : false;
                // 后期支持三种模式 预渲染模式、懒加载模式、懒加载并缓存模式
              },
              set({ data, slot }, value) {
                data.renderMode = value ? "pre" : "lazy";
              },
            },
          },
        ],
      },
      {
        title: "事件",
        items: [
          {
            title: "条件切换",
            type: "_event",
            options: {
              outputId: "changeCondition",
            },
          },
          {
            title: `切换到当前条件时`,
            type: "_event",
            options: {
              outputId: data._editSelectOutputId_,
            },
          },
        ],
      },
    ];
  },
};
