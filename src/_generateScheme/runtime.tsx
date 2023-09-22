import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {

    if (!env.runtime) {
        return;
    }

    inputs['generate']((val) => {
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


        const app = Taro.getApp();
        let API = `${app?.mybricks?.status?.callServiceHost}/runtime/api/domain/service/run`;

        let query = [];
        Object.keys(val.query).forEach((key) => {
            if (val.query[key] === undefined) {
                return;
            }
            query.push(`${key}=${encodeURIComponent(val.query[key])}`);
        });

        Taro.request({
            url: API,
            method: "POST",
            data: {
                "projectId": app?.mybricks?.status?.appid,
                "fileId": app?.mybricks?.status?.appid,
                "serviceId": "generatescheme",
                params: {
                    "jump_wxa": {
                        "path": val.path,
                        "query": query.join("&"),
                        "env_version": "release"
                    }
                }
            },
            success: (res) => {

                console.log(res);

                if (res.data.code === 1) {
                    outputs['onSuccess'](res.data.data.openlink);
                } else {
                    outputs['onFail']();
                }

            },
            fail: (res) => {
                outputs['onFail']();
            }
        });

    });

}
