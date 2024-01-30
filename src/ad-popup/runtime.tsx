import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as Taro from "@tarojs/taro";
import { AdType } from "./constants";

enum Status {
  idle = 0,
  ready = 1,
  err = 2,
}

const handleShowErrCode = (errCode) => {
  if (errCode == 1002) {
    return(`请检查广告位ID是否属于当前小程序，或者广告位ID前后有空格`);
  }
  if (errCode == 1003) {
    return(`内部错误，可忽略`);
  }
  if (errCode == 1004) {
    return(`无合适的广告，需要兼容处理`);
  }
  if (errCode == 1005 || errCode == 1006) {
    return(`当前广告审核中或者审核失败，无法展示广告`);
  }
  if (errCode == 1007 || errCode == 1008) {
    return(`广告被封禁或者被关闭`);
  }
}


export default function ({ env, data, inputs, outputs }) {
  const adRef = useRef<Taro.InterstitialAd | Taro.RewardedVideoAd>(null);
  const [status, setStatus] = useState<Status>(Status.idle);

  const initPopupAd = useCallback(() => {
    if (!data.adUnitId) {
      console.warn('缺失广告ID')
      return
    }


    // @ts-ignore
    adRef.current = Taro.createInterstitialAd({ adUnitId: data.adUnitId });

    console.log('data.adUnitId', data.adUnitId, adRef.current)


    if (adRef.current) {
      adRef.current.onLoad(() => {
        setStatus(Status.ready);
        outputs["onLoad"]?.();
      });

      adRef.current.onClose(() => {
        outputs["onClose"]?.();
      });

      adRef.current.onError((err) => {
        const { errCode } = err;
        console.warn(handleShowErrCode(errCode))
        setStatus(Status.err);
        outputs["onError"]?.(err);
      });
    }
  }, []);

  const initRewardVideoAd = useCallback(() => {
    if (!data.adUnitId) {
      console.warn('缺失广告ID')
      return
    }

    // @ts-ignore
    adRef.current = Taro.createRewardedVideoAd({
      adUnitId: data.adUnitId,
    }) as Taro.RewardedVideoAd;

    if (adRef.current) {
      adRef.current.onLoad(() => {
        setStatus(Status.ready);
        outputs["onLoad"]?.();
      });

      adRef.current.onClose((res) => {
        // 用户点击了【关闭广告】按钮
        if (res && res.isEnded) {
          // 正常播放结束，可以下发游戏奖励
          outputs["onFinishRewardVideo"]?.();
        } else {
          outputs["onClose"]?.();
        }
      });

      // 这里按理说只监听加载的失败
      adRef.current.onError((err) => {
        const { errCode } = err;
        console.warn(handleShowErrCode(errCode))
        outputs["onError"]?.(err);
        setStatus(Status.err);
      });
    }
  }, []);

  useEffect(() => {
    if (data.type === AdType.popup) {
      initPopupAd();
    } else if (data.type === AdType.rewardVideo) {
      initRewardVideoAd();
    }

    return () => {
      adRef.current?.destroy?.();
    };
  }, []);

  inputs["showAd"]?.((_, relOutputs) => {
    if (!adRef.current) {
      console.warn('广告实例不存在')
      return
    }

    if (status !== Status.ready) {
      console.warn(`当前广告插件未加载成功`);
      if (data.type === AdType.rewardVideo) {
        // 如果是激励视频，尝试重新加载
        adRef.current
          ?.load()
          .then(() => {
            return adRef.current?.show();
          })
          .then(() => {
            relOutputs['onShowSuccess']?.()
          })
          .catch((err) => {
            relOutputs['onShowError']?.(err)
            console.warn(`当前激励视频广告插件重试失败`);
          });
      }
      return;
    }

    adRef.current
      ?.show()
      .then(() => {
        relOutputs['onShowSuccess']?.()
      })
      .catch((err) => {
        relOutputs['onShowError']?.(err)
        console.warn(`广告展示失败`, err);
      });
  });

  return null;
}
