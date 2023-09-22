import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {

    if (!env.runtime) {
        return;
    }


    inputs['login'](() => {

        // mock
        if (env.runtime?.debug) {
            try {
                let result = data.mock;
                outputs["onComplate"](JSON.parse(decodeURIComponent(result)));
            } catch (e) {
                outputs['onComplate']({ "openid": "" });
            }
            return;
        }

        Taro.login({
            success: (res) => {
                const app = Taro.getApp();
                let API = `${app?.mybricks?.status?.callServiceHost}/runtime/api/domain/service/run`;

                Taro.request({
                    url: API,
                    method: "POST",
                    data: {
                        "projectId": app?.mybricks?.status?.appid,
                        "fileId": app?.mybricks?.status?.appid,
                        "serviceId": "jscode2session",
                        params: {
                            code: res.code
                        }
                    },
                    success: (res) => {
                        outputs['onComplate'](res.data);
                    },
                    fail: (res) => {
                        outputs['onComplate']({
                            openid: ""
                        });
                    }
                });
            },
            fail: (res) => {
                outputs['onComplate']({
                    openid: ""
                });
            },
        });
    });

}
