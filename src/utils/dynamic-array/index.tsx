import * as React from "react";

const DynamicEditors = ({ data, keyName, onSwitch }) => {
  return (
    <div style={{ position: "relative", marginTop: -15 }}>
      {data[keyName] ? (
        <div>
          <div>关闭动态数据源</div>
          <button
            onClick={() => {
              data[keyName] = false;
              onSwitch?.(data[keyName]);
            }}
          >
            关闭
          </button>
        </div>
      ) : (
        <div>
          <div>开启动态数据源</div>
          <button
            onClick={() => {
              data[keyName] = true;
              onSwitch?.(data[keyName]);
            }}
          >
            开启
          </button>
        </div>
      )}
    </div>
  );
};

export class DynamicArrayData {
  keyName: string;

  constructor({ keyName }) {
    this.keyName = keyName;
  }

  init = () => {};

  editors = ({ data }, { title = "数据源", array, effects }) => {
    const keyName = this.keyName;

    const modeKeyName = `${keyName}_dynamic`;

    const onSwitch = (value) => {
      if (value) {
        effects?.onSwitchToDynamic?.(data[keyName])
      } else {
        effects?.onSwitchToStatic?.(data[keyName])
      }
    };

    return {
      title,
      items: [
        {
          title: "",
          type: "editorRender",
          options: {
            render: () => {
              return (
                <div style={{ marginTop: -36 }}></div>
              );
            },
          },
        },
        {
          title: "数据源",
          type: "array",
          ifVisible({ data }) {
            return !!!data[modeKeyName];
          },
          options: array.options,
          value: {
            get({ data }) {
              return data[keyName];
            },
            set(context, value) {
              const { data } = context;
              let action = computedAction({
                before: data[keyName],
                after: value,
              });

              switch (action?.name) {
                case "remove":
                  effects.onRemove?.(context, action);
                  break;
                case "add":
                  effects.onAdd?.(context, action);
                  break;
                case "update":
                  effects.onUpdate?.(context, action);
                  break;
              }
              data[keyName] = value;
            },
          },
        },
        // {
        //   title: "",
        //   type: "editorRender",
        //   options: {
        //     render: () => {
        //       return (
        //         <DynamicEditors
        //           data={data}
        //           keyName={modeKeyName}
        //           onSwitch={onSwitch}
        //         />
        //       );
        //     },
        //   },
        // },
      ],
    };
  };
}

function computedAction({ before = [], after = [] }) {
  let beforeIds = before.map((item) => item._id);
  let afterIds = after.map((item) => item._id);

  switch (true) {
    case before.length > after.length: {
      let diffId = beforeIds.filter((x) => !afterIds.includes(x))[0];
      let diffItem = before.filter((x) => diffId.includes(x._id))[0];
      return {
        name: "remove",
        value: diffItem,
      };
    }
    case before.length < after.length: {
      let diffId = afterIds.filter((x) => !beforeIds.includes(x))[0];
      let diffItem = after.filter((x) => diffId.includes(x._id))[0];
      return {
        name: "add",
        value: diffItem,
      };
    }

    case before.length === after.length: {
      let diffItem = null;

      for (let i = 0; i < before.length; i++) {
        if (JSON.stringify(before[i]) !== JSON.stringify(after[i])) {
          diffItem = after[i];
          break;
        }
      }

      return {
        name: "update",
        value: diffItem,
      };
    }
  }
}
