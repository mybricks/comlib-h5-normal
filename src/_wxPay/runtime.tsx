import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs, logger }) {
  inputs["wx_requestPayment_body"]((val, relOutpus) => {
    console.log("进入前端支付组件", val);
    const signType = "RSA"; //签名算法
    Taro.requestPayment({
      nonceStr: val.nonce_str,
      timeStamp: val.timestamp,
      signType,
      paySign: val.pay_sign,
      package: `prepay_id=${val.prepay_id}`,
      success: (res) => {
        outputs["onSuccess"](res);
      },
      fail: (err) => {
        outputs["onFail"](err);
      },
    });
  });
}
