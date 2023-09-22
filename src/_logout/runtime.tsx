import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs, logger }) {

    if (env.runtime) {

        inputs['logout'](() => {
            Taro.removeStorageSync('userInfo');
            outputs['result'](null);
        });

    }
}
