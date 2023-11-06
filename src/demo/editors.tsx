import SchemaEditor from "./editors/schemaEditor.tsx";
import schema from "./editors/schema.json";
import { uuid } from "./editors/utils";

console.log(transformSchema(schema));

export default {
  ":root": {
    items: [
      {
        title: "自定义编辑项",
        type: "editorRender", //自定义编辑器
        options: {
          render: ({ editConfig }) => {
            return (
              <SchemaEditor
                value={editConfig.value.get()}
                onChange={editConfig.value.set}
              />
            );
          },
        },
        value: {
          get({ data }) {
            return data.config || transformSchema(schema);
          },
          set({ data }, value) {
            data.config = value;
          },
        },
      },
    ],
  },
};

function transformSchema(schema, name = "root", type = "root") {
  const result = {
    id: uuid(),
    name: name,
    type: type,
    children: [],
  };

  if (typeof schema === "object" && schema.properties) {
    for (const key in schema.properties) {
      if (schema.properties[key].type === "array") {
        result.children.push({
          id: uuid(),
          name: key,
          type: "array",
          children: schema.properties[key].items
            ? [
                transformSchema(
                  schema.properties[key].items,
                  key,
                  schema.properties[key].items.type
                ),
              ]
            : [],
        });
      } else if (schema.properties[key].type === "object") {
        result.children.push(
          transformSchema(
            schema.properties[key],
            key,
            schema.properties[key].type
          )
        );
      } else {
        result.children.push({
          id: uuid(),
          name: key,
          type: schema.properties[key].type,
        });
      }
    }
  }

  return result;
}
