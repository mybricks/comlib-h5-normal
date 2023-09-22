import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["chooseAddress"](() => {
    // debug 模式下，直接返回 mock 数据
    if (env.runtime?.debug) {
      outputs["onSuccess"]({
        nationalCodeFull: "330110012",
        telNumber: "18612345678",
        userName: "姓名",
        nationalCode: "330110",
        errMesg: "chooseAddress:ok",
        postalCode: "310000",
        provinceName: "浙江省",
        cityName: "杭州市",
        countyName: "余杭区",
        streetName: "仓前街道",
        detailInfo: "仓前街道EFC英国中心",
        detailInfoNew: "EFC英国中心",
      });
      return;
    }

    Taro.chooseAddress({
      success(res) {
        outputs["onSuccess"](res);
      },
      fail(err) {
        outputs["onFail"](err);
      },
    });
  });
}
