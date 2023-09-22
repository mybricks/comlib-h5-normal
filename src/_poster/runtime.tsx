import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["call"](async (val) => {
    let elements = val.elements;
    // JSON.parse(JSON.stringify(data.elements));

    // 创建离屏 2D canvas 实例
    const canvas = Taro.createOffscreenCanvas({
      type: "2d",
      width: 300,
      height: 150,
    });

    // 获取 context
    const context = canvas.getContext("2d");

    // 预加载所有图片
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];
      if (element.type === "image") {
        const image = canvas.createImage();

        await new Promise((resolve) => {
          image.onload = resolve;
          image.src = element.image;
        });

        elements[i].imageObj = image;
      }
    }

    // 把元素画到离屏 canvas 上
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];

      switch (element.type) {
        case "text":
          drawText(context, element);
          break;
        case "image":
          await drawImage(context, element);
          break;
        default:
          break;
      }
    }

    // 获取离屏 canvas 的内容
    const base64 = context.canvas.toDataURL("image/png");
    outputs["onClick"](base64);

    async function drawImage(context, element) {
      const { imageObj, x, y, width, height } = element;
      console.log(imageObj, x, y, width, height);
      context.drawImage(imageObj, x, y, width, height);
    }

    function drawText(context, element) {
      const { text, x, y, color, fontSize } = element;
      console.log(context);

      context.fillStyle = color;
      context.font = fontSize;
      context.fillText(text, x, y);
    }
  });
}
