import { LineProps } from "./constants";
import Style from "./runtime.less";

export default {
  "@init"({ style }) {
    style.width = 200;
    style.height = 1;
    style.position = "absolute";
  },
  "@resize": {
    options: ["width"],
  },
  ":root": {
    items: [
      {
        title:"颜色",
        type:"colorpicker",
        value:{
          get({data}){
            return data.color;
          },
          set({data},value){
            data.color = value;
          }
        }
      },
      {
        title: "类型",
        type: "Line",
        value: {
          get({ data,style }) {
            console.log("style",style);
            return data.type;
          },
          set({ data }: EditorResult<LineProps>, value: LineProps["type"]) {
            data.type = value;
          },
        },
      },
      {
        title: "线宽",
        type: "inputNumber",
        options: [{ min: 1, width: 100 }],
        value: {
          get({ data }: EditorResult<LineProps>) {
            return [data.lineWidth];
          },
          set({ data, style }: EditorResult<LineProps>, value: number[]) {
            data.lineWidth = value[0];
            style.height = value[0];
          },
        },
      },
    ],
  },
};
