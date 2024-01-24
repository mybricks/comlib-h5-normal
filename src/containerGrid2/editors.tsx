import { CSSProperties } from "react";
import { uuid } from "../utils";

enum UnitEnum {
  Px = "px",
  Auto = "auto",
}

export default {
  "@init"({ style, data, slot }) {
    style.width = "100%";
    style.height = 100;
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":root"({ data, output, style, slots }, cate0, cate1, cate2) {
    cate0.title = "布局";
    cate0.items = [
      {
        title: "拆分为两列",
        type: "button",
        ifVisible: ({ data, focusArea }) => {
          if (data.tree.children.length > 1) {
            return false;
          } else {
            return true;
          }
        },
        value: {
          set({ data, focusArea }) {
            let id = data.tree.id;
            let node = findNode(id, data.tree); // 当前节点
            let cloneNode = JSON.parse(JSON.stringify(node)); // 当前节点的克隆节点

            let newNode = generateNode(slots); // 新节点
            let parentNode = findParentNode(id, data.tree); // 父节点，可能为空

            /**
             * 如果当前节点是根节点，
             * 则生成一个 row 父节点，然后将本节点作为第一个子节点，再增加一个子节点
             */
            if (!parentNode) {
              let newParentNode = generateRow([cloneNode, newNode]);
              data.tree = newParentNode;
              return;
            }

            /**
             * 如果父节点是 row，则在后面增加一个子节点
             */
            if (parentNode?.direction === "row") {
              parentNode.children.splice(node.index + 1, 0, newNode);
            }

            /**
             * 如果父节点是 col，
             * 则生成一个 row 父节点，然后将本节点作为第一个子节点，再增加一个子节点
             * 将本节点替换为新生成的父节点
             */
            if (parentNode?.direction === "col") {
              let newParentNode = generateRow([cloneNode, newNode]);
              let index = parentNode?.children.findIndex(
                (item) => item.id === id
              );
              parentNode.children[index] = newParentNode;
            }

            data.tree = JSON.parse(JSON.stringify(data.tree));
          },
        },
      },
      {
        title: "拆分为两行",
        type: "button",
        ifVisible: ({ data, focusArea }) => {
          if (data.tree.children.length > 1) {
            return false;
          } else {
            return true;
          }
        },
        value: {
          set({ data, focusArea }) {
            let id = data.tree.id;
            let node = findNode(id, data.tree); // 当前节点
            let cloneNode = JSON.parse(JSON.stringify(node)); // 当前节点的克隆节点

            let newNode = generateNode(slots); // 新节点
            let parentNode = findParentNode(id, data.tree); // 父节点，可能为空

            /**
             * 如果当前节点是根节点，
             * 则生成一个 col 父节点，然后将本节点作为第一个子节点，再增加一个子节点
             */
            if (!parentNode) {
              let newParentNode = generateCol([cloneNode, newNode]);
              data.tree = newParentNode;
              return;
            }

            /**
             * 如果父节点是 col，则在后面增加一个子节点
             */
            if (parentNode?.direction === "col") {
              // parentNode.children.push(newNode);
              parentNode.children.splice(node.index + 1, 0, newNode);
            }

            /**
             * 如果父节点是 row，
             * 则生成一个 col 父节点，然后将本节点作为第一个子节点，再增加一个子节点
             * 将本节点替换为新生成的父节点
             */
            if (parentNode?.direction === "row") {
              let newParentNode = generateCol([cloneNode, newNode]);
              let index = parentNode?.children.findIndex(
                (item) => item.id === id
              );
              parentNode.children[index] = newParentNode;
            }

            data.tree = JSON.parse(JSON.stringify(data.tree));
          },
        },
      },
      {
        title: "布局",
        type: "layout",
        ifVisible: ({ data, focusArea }) => {
          if (data.tree.children.length > 1) {
            return false;
          } else {
            return true;
          }
        },
        value: {
          get({ data, focusArea }) {
            let id = data.tree.id;
            let node = findNode(id, data.tree);
            return node?.layout;
          },
          set({ data, focusArea }, value) {
            let id = data.tree.id;
            let node = findNode(id, data.tree);

            const slot = slots.get(node.id);
            /** 根据最终生效的CSS设置布局 */
            setSlotLayoutByCss(slot, value);

            data.tree = updateNode(
              {
                ...node,
                layout: value,
              },
              data.tree
            );
          },
        },
      },
      {
        title: "单击",
        type: "_Event",
        options: {
          outputId: "click_layout",
        },
      },
    ];
    cate1.title = "样式";
    cate1.items = [
      {
        title: "样式",
        type: "styleNew",
        options: {
          defaultOpen: true,
          plugins: ["background", "border", "padding", "boxshadow", "overflow"],
        },
        value: {
          get({ data }) {
            return (
              // 兜底编辑器 bug
              data.style ?? {
                paddingTop: "0px",
                paddingLeft: "0px",
                paddingBottom: "0px",
                paddingRight: "0px",
              }
            );
          },
          set({ data }, value) {
            data.style = JSON.parse(JSON.stringify(value));
          },
        },
      },
    ];
  },
  "div[data-leaf]": {
    title: "内容",
    items: ({ data, output, style, focusArea, slots }, cate0, cate1, cate2) => {
      cate0.title = "常规";
      cate0.items = [
        {
          title: "拆分为两列",
          type: "button",
          value: {
            set({ data, focusArea }) {
              if (!focusArea) {
                return;
              }

              let id = focusArea.dataset.id;
              let node = findNode(id, data.tree); // 当前节点
              let cloneNode = JSON.parse(JSON.stringify(node)); // 当前节点的克隆节点

              let newNode = generateNode(slots); // 新节点
              let parentNode = findParentNode(id, data.tree); // 父节点，可能为空

              /**
               * 如果当前节点是根节点，
               * 则生成一个 row 父节点，然后将本节点作为第一个子节点，再增加一个子节点
               */
              if (!parentNode) {
                let newParentNode = generateRow([cloneNode, newNode]);
                data.tree = newParentNode;
                return;
              }

              /**
               * 如果父节点是 row，则在后面增加一个子节点
               */
              if (parentNode?.direction === "row") {
                // parentNode.children.push(newNode);
                parentNode.children.splice(node.index + 1, 0, newNode);
              }

              /**
               * 如果父节点是 col，
               * 则生成一个 row 父节点，然后将本节点作为第一个子节点，再增加一个子节点
               * 将本节点替换为新生成的父节点
               */
              if (parentNode?.direction === "col") {
                let newParentNode = generateRow([cloneNode, newNode]);
                let index = parentNode?.children.findIndex(
                  (item) => item.id === id
                );
                parentNode.children[index] = newParentNode;
              }

              data.tree = JSON.parse(JSON.stringify(data.tree));
            },
          },
        },
        {
          title: "拆分为两行",
          type: "button",
          value: {
            set({ data, focusArea }) {
              if (!focusArea) {
                return;
              }

              let id = focusArea.dataset.id;
              let node = findNode(id, data.tree); // 当前节点
              let cloneNode = JSON.parse(JSON.stringify(node)); // 当前节点的克隆节点

              let newNode = generateNode(slots); // 新节点
              let parentNode = findParentNode(id, data.tree); // 父节点，可能为空

              /**
               * 如果当前节点是根节点，
               * 则生成一个 col 父节点，然后将本节点作为第一个子节点，再增加一个子节点
               */
              if (!parentNode) {
                let newParentNode = generateCol([cloneNode, newNode]);
                data.tree = newParentNode;
                return;
              }

              /**
               * 如果父节点是 col，则在后面增加一个子节点
               */
              if (parentNode?.direction === "col") {
                parentNode.children.splice(node.index + 1, 0, newNode);
              }

              /**
               * 如果父节点是 row，
               * 则生成一个 col 父节点，然后将本节点作为第一个子节点，再增加一个子节点
               * 将本节点替换为新生成的父节点
               */
              if (parentNode?.direction === "row") {
                let newParentNode = generateCol([cloneNode, newNode]);
                let index = parentNode?.children.findIndex(
                  (item) => item.id === id
                );
                parentNode.children[index] = newParentNode;
              }

              data.tree = JSON.parse(JSON.stringify(data.tree));
            },
          },
        },
        {
          title: "尺寸",
          ifVisible({ data, focusArea }) {
            if (!focusArea) {
              return;
            }
            let id = focusArea.dataset.id;

            // 非根节点
            let parentNode = findParentNode(id, data.tree);
            return !!parentNode;
          },
          items: [
            {
              title: "宽度填充",
              type: "Select",
              options: [
                { value: UnitEnum.Auto, label: "自动填充" },
                { value: UnitEnum.Px, label: "固定宽度" },
              ],
              value: {
                get({ data, focusArea }) {
                  if (!focusArea) {
                    return;
                  }
                  let id = focusArea.dataset.id;
                  let node = findNode(id, data.tree);

                  return node?.size.fixedWidth ? UnitEnum.Px : UnitEnum.Auto;
                },
                set({ data, focusArea }, val) {
                  if (!focusArea) {
                    return;
                  }
                  let id = focusArea.dataset.id;
                  let node = findNode(id, data.tree);

                  //计算宽度
                  let eleWidth = focusArea.ele.getBoundingClientRect().width;
                  let artboardWidth = focusArea.ele
                    .closest("[class^=artboard-]")
                    .getBoundingClientRect().width;
                  let width = eleWidth / (artboardWidth / 375);

                  data.tree = updateNode(
                    {
                      ...node,
                      size: {
                        ...node.size,
                        fixedWidth: val === UnitEnum.Px,
                        width: width,
                      },
                    },
                    data.tree
                  );
                },
              },
            },
            {
              title: "指定宽度(px)",
              type: "Text",
              options: {
                type: "Number",
              },
              ifVisible({ data, focusArea }) {
                if (!focusArea) {
                  return;
                }
                let id = focusArea.dataset.id;
                let node = findNode(id, data.tree);
                return node?.size.fixedWidth;
              },
              value: {
                get({ data, focusArea }) {
                  let id = focusArea.dataset.id;
                  let node = findNode(id, data.tree);
                  return node?.size.width;
                },
                set({ data, focusArea }, value) {
                  if (!focusArea) {
                    return;
                  }
                  let id = focusArea.dataset.id;
                  let node = findNode(id, data.tree);

                  data.tree = updateNode(
                    {
                      ...node,
                      size: {
                        ...node.size,
                        width: +value,
                      },
                    },
                    data.tree
                  );
                },
              },
            },
            {
              title: "高度填充",
              type: "Select",
              options: [
                { value: UnitEnum.Auto, label: "自动填充" },
                { value: UnitEnum.Px, label: "固定高度" },
              ],
              value: {
                get({ data, focusArea }) {
                  if (!focusArea) {
                    return;
                  }
                  let id = focusArea.dataset.id;
                  let node = findNode(id, data.tree);

                  return node?.size.fixedHeight ? UnitEnum.Px : UnitEnum.Auto;
                },
                set({ data, focusArea }, val) {
                  if (!focusArea) {
                    return;
                  }
                  let id = focusArea.dataset.id;
                  let node = findNode(id, data.tree);

                  //计算宽度
                  let eleHeight = focusArea.ele.getBoundingClientRect().height;
                  let artboardWidth = focusArea.ele
                    .closest("[class^=artboard-]")
                    .getBoundingClientRect().width;
                  let height = eleHeight / (artboardWidth / 375);

                  data.tree = updateNode(
                    {
                      ...node,
                      size: {
                        ...node.size,
                        fixedHeight: val === UnitEnum.Px,
                        height: height,
                      },
                    },
                    data.tree
                  );
                },
              },
            },
            {
              title: "指定高度(px)",
              type: "Text",
              options: {
                type: "Number",
              },
              ifVisible({ data, focusArea }) {
                if (!focusArea) {
                  return;
                }
                let id = focusArea.dataset.id;
                let node = findNode(id, data.tree);
                return node?.size.fixedHeight;
              },
              value: {
                get({ data, focusArea }) {
                  let id = focusArea.dataset.id;
                  let node = findNode(id, data.tree);
                  return node?.size.height;
                },
                set({ data, focusArea }, value) {
                  if (!focusArea) {
                    return;
                  }
                  let id = focusArea.dataset.id;
                  let node = findNode(id, data.tree);

                  data.tree = updateNode(
                    {
                      ...node,
                      size: {
                        ...node.size,
                        height: +value,
                      },
                    },
                    data.tree
                  );
                },
              },
            },
          ],
        },
        // {
        //   ifVisible({ data, focusArea }) {
        //     if (!focusArea) {
        //       return;
        //     }
        //     let id = focusArea.dataset.id;

        //     // 非根节点
        //     let parentNode = findParentNode(id, data.tree);
        //     return !!parentNode;
        //   },
        //   title: "固定宽度",
        //   type: "Switch",
        //   value: {
        //     get({ data, focusArea }) {
        //       if (!focusArea) {
        //         return;
        //       }
        //       let id = focusArea.dataset.id;
        //       let node = findNode(id, data.tree);
        //       return node?.size.fixedWidth;
        //     },
        //     set({ data, focusArea }, value) {
        //       if (!focusArea) {
        //         return;
        //       }
        //       let id = focusArea.dataset.id;
        //       let node = findNode(id, data.tree);

        //       data.tree = updateNode(
        //         {
        //           ...node,
        //           size: {
        //             ...node.size,
        //             fixedWidth: value,
        //           },
        //         },
        //         data.tree
        //       );
        //     },
        //   },
        // },
        // {
        //   ifVisible({ data, focusArea }) {
        //     if (!focusArea) {
        //       return;
        //     }
        //     let id = focusArea.dataset.id;
        //     let node = findNode(id, data.tree);
        //     return node?.size.fixedWidth;
        //   },
        //   title: "宽度值",
        //   type: "text",
        //   value: {
        //     get({ data, focusArea }) {
        //       let id = focusArea.dataset.id;
        //       let node = findNode(id, data.tree);
        //       return node?.size.width;
        //     },
        //     set({ data, focusArea }, value) {
        //       if (!focusArea) {
        //         return;
        //       }
        //       let id = focusArea.dataset.id;
        //       let node = findNode(id, data.tree);

        //       data.tree = updateNode(
        //         {
        //           ...node,
        //           size: {
        //             ...node.size,
        //             width: +value,
        //           },
        //         },
        //         data.tree
        //       );
        //     },
        //   },
        // },
        // {
        //   ifVisible({ data, focusArea }) {
        //     if (!focusArea) {
        //       return;
        //     }
        //     let id = focusArea.dataset.id;

        //     // 非根节点
        //     let parentNode = findParentNode(id, data.tree);
        //     return !!parentNode;
        //   },
        //   title: "固定高度",
        //   type: "Switch",
        //   value: {
        //     get({ data, focusArea }) {
        //       if (!focusArea) {
        //         return;
        //       }
        //       let id = focusArea.dataset.id;
        //       let node = findNode(id, data.tree);
        //       return node?.size.fixedHeight;
        //     },
        //     set({}, value) {
        //       if (!focusArea) {
        //         return;
        //       }
        //       let id = focusArea.dataset.id;
        //       let node = findNode(id, data.tree);

        //       data.tree = updateNode(
        //         {
        //           ...node,
        //           size: {
        //             ...node.size,
        //             fixedHeight: value,
        //           },
        //         },
        //         data.tree
        //       );
        //     },
        //   },
        // },
        // {
        //   ifVisible({ data, focusArea }) {
        //     if (!focusArea) {
        //       return;
        //     }
        //     let id = focusArea.dataset.id;
        //     let node = findNode(id, data.tree);
        //     return node?.size.fixedHeight;
        //   },
        //   title: "高度值",
        //   type: "text",
        //   value: {
        //     get({ data, focusArea }) {
        //       if (!focusArea) {
        //         return;
        //       }
        //       let id = focusArea.dataset.id;
        //       let node = findNode(id, data.tree);
        //       return node?.size.height;
        //     },
        //     set({ data, focusArea }, value) {
        //       if (!focusArea) {
        //         return;
        //       }
        //       let id = focusArea.dataset.id;
        //       let node = findNode(id, data.tree);

        //       data.tree = updateNode(
        //         {
        //           ...node,
        //           size: {
        //             ...node.size,
        //             height: +value,
        //           },
        //         },
        //         data.tree
        //       );
        //     },
        //   },
        // },
        {
          title: "布局",
          type: "layout",
          value: {
            get({ data, focusArea }) {
              if (!focusArea) {
                return;
              }
              let id = focusArea.dataset.id;
              let node = findNode(id, data.tree);
              return node?.layout;
            },
            set({ data, focusArea }, value) {
              if (!focusArea) {
                return;
              }
              let id = focusArea.dataset.id;
              let node = findNode(id, data.tree);

              const slot = slots.get(node.id);
              /** 根据最终生效的CSS设置布局 */
              setSlotLayoutByCss(slot, value);

              data.tree = updateNode(
                {
                  ...node,
                  layout: value,
                },
                data.tree
              );
            },
          },
        },
        {},
        {
          title: "单击",
          type: "_event",
          options: ({ data, focusArea, output }) => {
            if (!output) {
              return;
            }

            const nodeId = focusArea.dataset.id;
            const clickId = `click_node_${nodeId}`;
            if (!output.get(clickId)) {
              output.add(clickId, `${nodeId}_点击`, { type: "any" });
            }

            return {
              outputId: clickId,
            };
          },
        },
        {},
        {
          title: "删除",
          type: "button",
          ifVisible: ({ data, focusArea }) => {
            let id = focusArea.dataset.id;
            return !!findParentNode(id, data.tree);
          },
          value: {
            set({ data, focusArea, slots }) {
              if (!focusArea) {
                return;
              }

              // 当前节点id
              let id = focusArea.dataset.id;

              // 根节点不可删除
              let parentNode = findParentNode(id, data.tree);
              if (!parentNode) {
                console.log("根节点不可删除");
                alert("根节点不可删除");
                return;
              }

              /**
               * 如果父节点只有 2 个子节点，则删除本节点，然后将另一个子节点移动到父节点的位置
               */
              if (parentNode.children.length === 2) {
                let anthorNode = parentNode.children.find(
                  (item) => item.id !== id
                );
                let grandNode = findParentNode(parentNode.id, data.tree);

                if (grandNode) {
                  let index = grandNode.children.findIndex(
                    (item) => item.id === parentNode.id
                  );
                  grandNode.children[index] = anthorNode;

                  data.tree = JSON.parse(JSON.stringify(data.tree));
                } else {
                  data.tree = anthorNode;
                }
              }

              /**
               * 如果父节点超过 2 个子节点，则删除本节点
               */
              if (parentNode.children.length > 2) {
                let index = parentNode.children.findIndex(
                  (item) => item.id === id
                );
                parentNode.children.splice(index, 1);

                data.tree = JSON.parse(JSON.stringify(data.tree));
              }
            },
          },
        },
      ];
      cate1.title = "样式";
      cate1.items = [
        {
          title: "样式",
          type: "styleNew",
          options: {
            defaultOpen: true,
            plugins: [
              "background",
              "border",
              "padding",
              "boxshadow",
              "overflow",
            ],
          },
          value: {
            get({ data, focusArea }) {
              if (!focusArea) {
                return;
              }
              let id = focusArea.dataset.id;
              let node = findNode(id, data.tree);
              return node?.style;
            },
            set({ data, focusArea }, value) {
              if (!focusArea) {
                return;
              }
              let id = focusArea.dataset.id;
              let node = findNode(id, data.tree);

              data.tree = updateNode(
                {
                  ...node,
                  style: value,
                },
                data.tree
              );
            },
          },
        },
      ];
    },
  },
};

// 生成行容器
function generateRow(children = []) {
  let id = uuid();

  return {
    id: id,
    size: {
      fixedWidth: false,
      width: 30,
      fixedHeight: false,
      height: 30,
    },
    style: {},
    layout: {},
    direction: "row",
    isLeaf: false,
    children: children,
  };
}

// 生成列容器
function generateCol(children = []) {
  let id = uuid();

  return {
    id: id,
    size: {
      fixedWidth: false,
      width: 30,
      fixedHeight: false,
      height: 30,
    },
    style: {},
    layout: {},
    direction: "col",
    isLeaf: false,
    children: children,
  };
}

function generateNode(slots?) {
  let id = uuid();

  if (!!slots && !slots.get(id)) {
    slots.add(id, `内容_${id}`);
  }

  return {
    id: id,
    size: {
      fixedWidth: false,
      width: 30,
      fixedHeight: false,
      height: 30,
    },
    style: {},
    layout: {},
    direction: "",
    isLeaf: true,
    children: [],
  };
}

/**
 * 找到当前 node
 */
function findNode(id, tree) {
  if (tree.id === id) {
    return tree;
  }

  for (let i = 0; i < tree.children.length; i++) {
    let node = findNode(id, tree.children[i]);
    if (node) {
      return {
        ...node,
        index: i,
      };
    }
  }

  return null;
}

/**
 * 找到当前 node 的父级
 */
function findParentNode(id, tree) {
  for (let i = 0; i < tree.children.length; i++) {
    if (tree.children[i].id === id) {
      return tree;
    }
    let node = findParentNode(id, tree.children[i]);
    if (node) {
      return node;
    }
  }

  return null;
}

function updateNode(node, tree) {
  let cloneNode = JSON.parse(JSON.stringify(node));
  let cloneTree = JSON.parse(JSON.stringify(tree));

  let newTree = traverseTree(cloneTree);

  return JSON.parse(JSON.stringify(newTree));

  function traverseTree(node) {
    if (node.isLeaf === true) {
      if (node.id === cloneNode.id) {
        return cloneNode;
      } else {
        return node;
      }
    } else {
      for (let i = 0; i < node.children.length; i++) {
        node.children[i] = traverseTree(node.children[i]);
      }
    }

    return node;
  }
}

/**
 * 通过layoutEditor返回的CSSProperties设置slot的layout的
 * @param slot
 * @param cssStyles
 */
function setSlotLayoutByCss(slot: any, cssStyles: CSSProperties) {
  switch (true) {
    case cssStyles.position === "absolute": {
      slot.setLayout("absolute");
      // slot.setTitle("列（自由排列）");
      break;
    }
    case cssStyles.position !== "absolute" && cssStyles.display === "flex": {
      if (cssStyles.flexDirection === "row") {
        slot.setLayout("flex-row");
        // slot.setTitle("列（横向排列）");
      }
      if (cssStyles.flexDirection === "column") {
        slot.setLayout("flex-column");
        // slot.setTitle("列（竖向排列）");
      }
      break;
    }
  }
}
