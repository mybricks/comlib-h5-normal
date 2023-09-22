import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs, logger }) {

    if (env.runtime) {
        inputs['login']((val) => {
            Taro.setStorageSync('userInfo', val);
            outputs.onComplete(val);
        });
    }
    
}
