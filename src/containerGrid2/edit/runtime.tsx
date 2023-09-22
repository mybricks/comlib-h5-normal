import React, { useCallback, useMemo } from "react";
import cx from "classnames";
import css from "../style.less";

export default ({ id, data, outputs, slots }) => {
  /**
   * 递归处理 dom tree
   */
  const renderSlot = useCallback(
    (node, { parentNode }) => {
      // 渲染叶子结点
      if (node.isLeaf) {
        // console.warn("node", node.size);

        let leafSize = {};

        if (!parentNode) {
          leafSize.width = "100%";
          leafSize.height = "100%";
        } else {
          //
          if (parentNode.direction === "row") {
            if (node.size.fixedWidth) {
              leafSize.width = node.size.width;
            } else {
              leafSize.flex = 1;
            }

            if (node.size.fixedHeight) {
              leafSize.height = node.size.height;
            } else {
              leafSize.height = "100%";
            }
          }

          if (parentNode.direction === "col") {
            if (node.size.fixedHeight) {
              leafSize.height = node.size.height;
            } else {
              leafSize.flex = 1;
            }

            if (node.size.fixedWidth) {
              leafSize.width = node.size.width;
            } else {
              leafSize.width = "100%";
            }
          }
        }

        return (
          <div
            className={css.node}
            data-id={node.id}
            data-leaf
            style={{
              ...node.style,
              ...leafSize,
            }}
            key={node.id}
          >
            {slots[node.id]?.render({
              style: {
                ...node.layout,
              },
            })}
          </div>
        );
      }

      const nodeCx = cx({
        [css.row]: node.direction === "row",
        [css.col]: node.direction === "col",
      });

      return (
        <div className={nodeCx} data-id={node.id} key={node.id}>
          {node.children.map((child) => {
            // return <renderSlot tree={child} parentNode={node} />
            return renderSlot(child, {
              parentNode: node,
            });
          })}
        </div>
      );
    },
    [slots]
  );

  const tree = useMemo(() => {
    return renderSlot(data.tree, {
      parentNode: null,
    });
  }, [data.tree]);

  return (
    <div className={css.layout} style={data.style}>
      {tree}
    </div>
  );
};
