import css from "./editors.less";
import comJson from "./com.json";

export default {
  "@init": ({ style, data }) => {
    style.width = "100%";
  },
  ":root": {
    style: [],
    items({ data, output, input, style, slots }, cate0, cate1, cate2) {
      cate0.title = "常规";
      cate0.items = [
        /**
         * 消息扩展类型配置
         */
        {
          title: "消息扩展类型",
          type: "array",
          description: "内置类型 text, image",
          options: {
            getTitle: (item) => {
              return [`消息类型：${item.title}`];
            },
            onAdd(_id) {
              slots.add({
                id: _id,
                title: `消息类型：${_id}`,
                type: "scope",
                inputs: comJson.slots[0].inputs,
              });

              return {
                id: _id,
                title: _id,
              };
            },
            onRemove(_id) {
              slots.remove(_id);
            },
            customOptRender({ item, setList }) {
              return (
                <div className={css.my_edit}>
                  <div
                    className={css.edit}
                    onClick={(e) => {
                      e.stopPropagation();

                      const title = window.prompt("请输入类型值", item.title);

                      // 重复 title 校验
                      if (title && data.items.some((t) => t.title === title)) {
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
            selectable: false,
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
      ];
    },
  },
};
