import type { Data, PickType } from "./types";
import { getSuggestionFromSchema, uuid, getOutputSchema } from "./utils";
import debounce from "lodash/debounce";
import Tips from "./Tips/index";

const updateOutputSchema = debounce((data: Data, output) => {
  output.get().forEach((port) => {
    const pick = data.picks.find(({ key }) => key === port.id);
    if (!pick) return true;
    const outputSchema = getOutputSchema(pick.expression, data.inputSchema);
    port.setSchema(outputSchema);
  });
}, 1000);

export default {
  "@init": ({ data, output }: EditorResult<Data>) => {},
  "@inputConnected"({ data, output }, fromPin) {
    data.suggestions = getSuggestionFromSchema(fromPin.schema);
    data.inputSchema = fromPin.schema;
    updateOutputSchema(data, output);
  },
  "@inputUpdated"({ data }: EditorResult<Data>, updatePin) {
    data.suggestions = getSuggestionFromSchema(updatePin.schema);
    data.inputSchema = updatePin.schema;
  },
  ":root": ({ data }: EditorResult<Data>, cate1) => {
    cate1.title = "判断配置";
    cate1.items = [
      {
        title: "判断的字段",
        type: "expression",
        options: {
          suggestions: data.suggestions,
          placeholder: "输入表达式如{inputValue.a}",
        },
        description: `"判断这里输入的字段是否为空，如果不为空则原样输出数据到非空输出，反之同理；判断的字段应该精确到某个值，而不是对象或数组"`,
        value: {
          get({ data }: EditorResult<Data>) {
            console.log("get_data", data);
            return data.judged_field;
          },
          set({ data, output }: EditorResult<Data>, val: Array<PickType>) {
            data.judged_field = val;
          },
        },
      },
      {
        title: "使用说明",
        type: "editorRender",
        options: {
          render:Tips
        }
      },
    ];
  },
};
