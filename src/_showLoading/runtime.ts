import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["showLoading"]((val) => {
    Taro.showLoading({
      title: data.title,
      mask: env.runtime?.debug ? false : data.mask, // debug 模式下不显示蒙层
      complete: () => {
        outputs["afterShowLoading"](val);
      },
    });
  });

  //退出调试时自动隐藏掉loading
  if(typeof env?.runtime?.onComplete === 'function'){
    env.runtime.onComplete(()=>{
      Taro.hideLoading();
    })
  }

}
