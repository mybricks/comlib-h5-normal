const defaultSchema = { type: "any" };
const defaultOutputId = "then";

export default {
  "@init": ({ data, setDesc, setAutoRun, isAutoRun }) => {
    data.connectorConfig = data.connectorConfig || {};
    const autoRun = isAutoRun ? isAutoRun() : false;
    if (autoRun || data.immediate) {
      setAutoRun(true);
      data.immediate = true;
    }
    setDesc(`（连接器为空）`);
  },
  "@connectorUpdated": (
    { data, input, output, setDesc, setAutoRun, isAutoRun },
    { connector }
  ) => {
    if (!data.connector) return;

    if (connector.id === data.connector.id) {
      data.connector = {
        id: connector.id,
        title: connector.title,
        type: connector.type,
        script: connector.script,
        inputSchema: connector.inputSchema,
        outputSchema: connector.outputSchema,
      };

      updateIO({ input, output }, connector);

      setDesc(`已选择：${data.connector.title}`);
    }
  },
  "@connectorRemoved": (
    { data, input, output, setDesc, setAutoRun, isAutoRun },
    { connector }
  ) => {
    if (!data.connector) return;

    if (connector.id === data.connector.id) {
      data.connector = void 0;

      const callInt = input.get("call");
      if (callInt) {
        callInt.setSchema(defaultSchema);
      }

      const thenOut = output.get("then");
      thenOut.setSchema(defaultSchema);

      setDesc(`${connector.title} 已失效`);
    }
  },
  ":root": [
    {
      title: "连接器",
      type: "_connectorSelect",
      value: {
        get({ data }) {
          return data.connector;
        },
        set({ data, input, output, setDesc }, connector) {
          data.connector = connector;
          // updateIO({ input, output }, connector);

          if (connector) {
            updateConnector({ data, input, output }, connector);
            setDesc(`已选择：${data.connector.title}`);
          } else {
            deleteConnector({ data, input, output });
            setDesc("（连接器为空）");
          }
        },
      },
    },
    {},
    {
      title: "超时时间",
      description: "单位：毫秒, 默认值：60,000",
      type: "text",
      options: {
        type: "number",
      },
      value: {
        get({ data }) {
          return data.timeout;
        },
        set({ data }, timeout) {
          data.timeout = timeout;
        },
      },
    },
    {
      title: "动态配置",
      type: "switch",
      value: {
        get({ data }) {
          return data.showDynamicConfig;
        },
        set({ data, configs }, showDynamicConfig: boolean) {
          if (showDynamicConfig) {
            configs.add({
              id: "dynamicConfig",
              title: "连接器",
              schema: {
                type: "object",
              },
              binding: "data.dynamicConfig",
              editor: {
                type: "_connectorSelect",
              },
            });
          } else {
            configs.remove("dynamicConfig");
          }
          data.showDynamicConfig = showDynamicConfig;
        },
      },
    },
  ],
};

function isValidSchema(schema) {
  return (
    schema &&
    [
      "object",
      "array",
      "number",
      "string",
      "boolean",
      "any",
      "follow",
      "unknown",
    ].some((type) => schema.type === type)
  );
}

// function updateIO({ input, output }, connector) {
//   const callInt = input.get("call");
//   if (callInt) {
//     if (isValidSchema(connector.inputSchema)) {
//       callInt.setSchema(connector.inputSchema);
//     } else {
//       callInt.setSchema(defaultSchema);
//     }
//   }
//   const thenOut = output.get("then");

//   if (isValidSchema(connector.outputSchema)) {
//     thenOut.setSchema(connector.outputSchema);
//   } else {
//     thenOut.setSchema(defaultSchema);
//   }
// }

function deleteConnector({ data, input, output }) {
  output.get().forEach((o) => {
    if (!["then", "catch"].includes(o.id)) {
      output.remove(o.id);
    } else if (o.id === "then") output.get(o.id).setSchema(defaultSchema);
  });
}

function updateConnector({ input, output, data }, connector) {
  data.globalMock = connector.globalMock;
  data.connector = {
    id: connector.id,
    title: connector.title,
    type: connector.type,
    connectorName: connector.connectorName,
    script: connector.script,
  };
  updateIO({ input, output, data }, connector);
}

function updateIO({ input, output, data }, connector) {
  const callInt = input.get("call");
  if (callInt) {
    if (isValidSchema(connector.inputSchema)) {
      callInt.setSchema(connector.inputSchema);
    } else {
      callInt.setSchema(defaultSchema);
    }
  }

  if (connector.markList?.length) {
    output.get().forEach((o) => {
      if (o.id !== "then" && o.id !== "catch") {
        output.remove(o.id);
      }
    });
    connector.markList?.forEach((mark) => {
      const schema = isValidSchema(mark.outputSchema)
        ? mark.outputSchema
        : defaultSchema;

      if (mark.id === "default") {
        const then = output.get("then");
        then.setSchema(schema);
        then.setTitle(`${mark.title}(标记组)`);
      } else {
        const out = output.get(mark.id);
        if (!out) {
          output.add(mark.id, `${mark.title}(标记组)`, schema);
        } else {
          output.get(mark.id).setSchema(schema);
        }
      }
    });
  } else {
    output.get().forEach((o) => {
      if (o.id === "then") {
        output
          .get(o.id)
          .setSchema(
            isValidSchema(connector.outputSchema)
              ? connector.outputSchema
              : defaultSchema
          );
      } else if (o.id !== "catch") {
        output.remove(o.id);
      }
    });
  }

  /** 处理 Mock Schema */
  const allOutput = output.get();
  const curOutput = allOutput.find((o) => o.id === data.mockOutputId);

  if (curOutput) {
    data.outputSchema = output.get(curOutput.id).schema;
  } else {
    data.mockOutputId = defaultOutputId;
    data.outputSchema = output.get(defaultOutputId).schema;
  }
}
