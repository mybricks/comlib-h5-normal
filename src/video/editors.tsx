export default {
  "@init"({ style }) {
    style.width = "100%";
    style.height = "210";
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":root"({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = "常规";
    cate0.items = [
      {
        title: "基础属性",
        items: [
          {
            title: "视频资源地址",
            description:"填写正确有效的视频链接地址",
            type: "text",
            value: {
              get({ data }) {
                return data.src;
              },
              set({ data }, src: string) {
                data.src = src;
              },
            },
          },

          {
            ifVisible({ data }) {
              return !!data.controls;
            },
            title: "视频封面",
            description:"视频在未播放时显示的图片",
            type: "imageSelector",
            value: {
              get({ data }) {
                return data.poster;
              },
              set({ data }, poster: string) {
                data.poster = poster;
              },
            },
          },

        ],
      },
      {
        title: "高级属性",
        items: [
          {
            title: "是否为直播源",
            description:"开启后，视频将以直播流的形式播放",
            type: "Switch",
            value: {
              get({ data }) {
                return data["is-live"];
              },
              set({ data }, isLive: boolean) {
                data["is-live"] = isLive;
              },
            },
          },
          {
            title: "是否显示默认播放控件",
            description:"显示视频的默认播放控件，如播放/暂停按钮、进度条等",
            type: "Switch",
            value: {
              get({ data }) {
                return data.controls;
              },
              set({ data }, controls: boolean) {
                data.controls = controls;
              },
            },
          },
          {
            title: "是否自动播放",
            description:"页面加载完成后自动开始播放视频",
            type: "Switch",
            value: {
              get({ data }) {
                return data.autoplay;
              },
              set({ data }, autoplay: boolean) {
                data.autoplay = autoplay;
              },
            },
          },
          {
            title: "是否循环播放",
            description:"视频播放结束后重新开始播放",
            type: "Switch",
            value: {
              get({ data }) {
                return data.loop;
              },
              set({ data }, loop: boolean) {
                data.loop = loop;
              },
            },
          },
          {
            title: "是否静音播放",
            description:"视频播放时是否静音",
            type: "Switch",
            value: {
              get({ data }) {
                return data.muted;
              },
              set({ data }, muted: boolean) {
                data.muted = muted;
              },
            },
          },
        ]
      },
      {
        title: "事件",
        items: [
          {
            title: "当开始/继续播放时",
            type: "_event",
            options: {
              outputId: "onPlay",
            },
          },
          {
            title: "当暂停播放时",
            type: "_event",
            options: {
              outputId: "onPause",
            },
          },
          {
            title: "当播放到末尾时",
            type: "_event",
            options: {
              outputId: "onEnded",
            },
          },
          {
            title: "当播放进度改变时",
            type: "_event",
            options: {
              outputId: "onTimeUpdate",
            },
          },
          {
            title: "当视频出现缓冲时",
            type: "_event",
            options: {
              outputId: "onWaiting",
            },
          },
          {
            title: "当视频出错时",
            type: "_event",
            options: {
              outputId: "onError",
            },
          },
        ]
      }
    ];

    cate1.title = "样式";
    cate1.items = [
      {
        title: "当视频大小与 video 容器大小不一致时，视频的表现形式",
        type: "Select",
        options: [
          {
            value: "contain",
            label: "包含",
          },
          {
            value: "fill",
            label: "填充",
          },
          {
            value: "cover",
            label: "覆盖",
          },
        ],
        value: {
          get({ data }) {
            return data["object-fit"];
          },
          set({ data }, value: string) {
            data["object-fit"] = value;
          },
        },
      },
    ]
  },
};
