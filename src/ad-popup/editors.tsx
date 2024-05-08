import React from "react";
import { AdType } from './constants'

export default {
  "@init": ({ style, data }) => {
    style.width = '100%';
    style.height = "100%";
  },
  ":root": [
    {
      title: "说明",
      type: "editorRender",
      options: {
        render: (props) => {
          return (
            <div>
              <div>
                小程序广告需要开通「流量主」功能，并在后台创建好广告位
              </div>
              <a
                target="_blank"
                // href="https://ad.weixin.qq.com/pdf.html?id=851"
                href="https://ad.weixin.qq.com/docs/50"
              >
                参考链接
              </a>
            </div>
          );
        },
      },
    },
    {},
    {
      title: "广告类型",
      type: 'select',
      options: [
        { value: AdType.popup, label: "插屏广告" },
        { value: AdType.rewardVideo, label: "激励视频" }
      ],
      value: {
        get({ data }) {
          return data.type ?? AdType.popup;
        },
        set({ data, output }, value) {
          data.type = value;
          const rel = output.get('onFinishRewardVideo');
          if (value === AdType.rewardVideo && !rel) {
            output.add('onFinishRewardVideo', '广告播放完毕', { type: 'any' });
          }
          if (value === AdType.popup && rel) {
            output.remove('onFinishRewardVideo');
          }
        },
      },
    },
    {
      title: "广告ID",
      type: 'text',
      value: {
        get({ data }) {
          return data.adUnitId;
        },
        set({ data }, value: string) {
          data.adUnitId = value;
        },
      },
    },
    {
      title: '事件',
      items: [
        {
          title: "广告加载成功",
          type: "_event",
          options: {
            outputId: "onLoad",
          },
        },
        {
          title: "广告加载失败",
          type: "_event",
          options: {
            outputId: "onError",
          },
        },
        {
          title: "广告播放完毕",
          type: "_event",
          ifVisible({ data }) {
            return data.type === AdType.rewardVideo;
          },
          options: {
            outputId: "onFinishRewardVideo",
          },
        }
      ]
    }
  ],
};
