import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (env.runtime) {
    inputs["getWithPos"]((val) => {
      if (!val?.from || !val?.to) {
        outputs["onFail"]?.({ errMsg: "不合法的起点和终点" });
        return;
      }

      const url = `https://apis.map.qq.com/ws/direction/v1/driving/?key=${
        env?.apiKey ?? "WDOBZ-7WZWL-NFJPE-EKBHS-PBEEK-U4FA5"
      }&from=${val?.from?.latitude},${val?.from?.longitude}&to=${
        val?.to?.latitude
      },${val?.to?.longitude}&policy=TRIP,AVOID_HIGHWAY,NAV_POINT_FIRST`;
      Taro.request({
        url,
        success: (res) => {
          if (res.statusCode === 200 && res.data.status === 0) {
            const { result } = res.data ?? {};
            if (Array.isArray(result.routes)) {
              const polylines = result.routes.map((route) => {
                let points = []
                /** 解压坐标 */
                for (var i = 2; i < route.polyline.length; i++) {
                  route.polyline[i] =
                    route.polyline[i - 2] + route.polyline[i] / 1000000;
                }

                for(let i = 0; i < route.polyline.length / 2; i++) {
                  points[i] = {
                    latitude: route.polyline[i * 2],
                    longitude: route.polyline[i * 2 + 1],
                  }
                }
                return {
                  points,
                  width: data.width,
                  color: data.color,
                  dottedLine: data.dottedLine,
                  arrowLine: data.arrowLine,
                  borderColor: data.borderColor,
                  borderWidth: data.borderWidth,


                  distance: route.distance,
                  duration: route.duration
                };
              });

              const markers = [
                {
                  id: 0,
                  width: data.start?.width,
                  height: data.start?.height,
                  iconPath: data.start?.icon,
                  latitude: val.from?.latitude,
                  longitude: val.from?.longitude,
                },
                {
                  id: 1,
                  width: data.end?.width,
                  height: data.end?.height,
                  iconPath: data.end?.icon,
                  latitude: val.to?.latitude,
                  longitude: val.to?.longitude,
                }
              ]

              outputs["onSuccess"]?.({
                markers,
                polylines,
                autofit: data.autofit
              });
            }
          } else {
            outputs["onFail"]?.({
              errMsg: res.data?.message ?? res.errMsg ?? "网络错误",
            });
          }
        },
        fail: ({ errMsg }) => {
          outputs["onFail"]?.({ errMsg });
        },
      });
    });
  }
}
