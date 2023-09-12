const path = require('path')

const ctx = require.context('./src/', true, /\/com.json$/i)
const comAray = []

comAray.push({
  "title": "插槽实现滑动窗口",
  "enable": true,
  "namespace": "fangzhou.demos.dyn-rt-slot",
  "author": "CheMingjun",
  "author_name": "车明君",
  "version": "1.0.0",
  "description": "Demo",
  "singleton": true,
  "runtime": require("./src/demos/dyn-rt-slot/container/Demo.tsx").default,
  "preview": "https://ali-ec.static.yximgs.com/kos/nlav11092/image.ed9c3204f9c66033.png",
  "data": require("./src/demos/dyn-rt-slot/container/data.json"),
  "editors": "./editors.tsx",
  "slots": [
    {
      "id": "s0",
      "title": "测试插槽"
    }
  ],
  "inputs": [
    {
      "id": "in0",
      "title": "测试输入0",
      "rels": [
        "out0"
      ]
    }
  ],
  "outputs": [
    {
      "id": "out0",
      "title": "测试输出0"
    }
  ]
})

comAray.push({
    "title": "数据列表",
    "enable": true,
    "namespace": "fangzhou.demos.h5-data-list",
    "author": "CheMingjun",
    "author_name": "车明君",
    "version": "1.0.0",
    "description": "图片",
    "runtime": require("./src/demos/dyn-rt-slot/card/DataList.tsx").default,
    "data": require("./src/demos/dyn-rt-slot/card/data.json"),
    "editors": "./editors.tsx",
    "inputs": [
      {
        "id": "in0",
        "title": "输入1"
      },
      {
        "id": "in1",
        "title": "输入2"
      }
    ],
    "outputs": [
      {
        "id": "out0",
        "title": "输出1"
      },
      {
        "id": "out1",
        "title": "输出2"
      }
    ]
  }
)


comAray.push({
  "title": "视频",
  "namespace": "fangzhou.normal-h5.video",
  "author": "LiangLihao",
  "author_name": "梁李昊",
  "version": "1.0.0",
  "description": "视频",
  "runtime": require('./src/video/Video').default,
  "data": require('./src/video/data.json'),
  "data": "./data.json",
  "editors": "./editors.ts",
  "icon": "https://cdnfile.corp.kuaishou.com/kc/files/a/fangzhou/static_resources/video.png"
})


comAray.push({
    "title": "图片",
    "namespace": "fangzhou.normal-h5.image",
    "author": "CheMingjun",
    "author_name": "车明君",
    "icon": "https://cdnfile.corp.kuaishou.com/kc/files/a/fangzhou/icon-image.svg",
    "version": "1.0.0",
    "description": "图片",
    "runtime": require('./src/image/runtime').default,
    "data": require('./src/image/data.json'),
    "inputs": [
      {
        "id": "image",
        "title": "图片链接"
      }
    ],
    "outputs": [
      {
        "id": "click",
        "title": "点击"
      }
    ]
  }
)

comAray.push({
    "title": "Tabs",
    "namespace": "fangzhou.normal-h5.tabs",
    "author": "xiechuanfang",
    "author_name": "谢传芳",
    "version": "1.0.0",
    "description": "Tabs",
    "runtime": require('./src/tabs/runtime').default,
    "data": require('./src/tabs/data.json'),
    "slots": [
      {
        "id": "tab0",
        "title": "内容"
      },
      {
        "id": "tab1",
        "title": "内容"
      }
    ]
  }
)

comAray.push({
    "title": "商品列表",
    "namespace": "fangzhou.normal-h5.commondity-list",
    "author": "yangxian05",
    "author_name": "杨显",
    "version": "1.2.0",
    "description": "商品列表",
    "icon": "https://ali-ec.static.yximgs.com/kos/nlav11092/product-list.png",
    "data": require("./src/commodity-list/data.json"),
    "runtime": require("./src/commodity-list/runtime.tsx").default,
    "inputs": [
      {
        "id": "resetAndListData",
        "title": "重置并输入数据"
      },
      {
        "id": "listData",
        "title": "输入更多数据"
      },

      {
        "id": "loading",
        "title": "加载状态"
      },
      {
        "id": "updateStock",
        "title": "更新商品库存"
      }
    ],
    "outputs": [
      {
        "id": "loadMore",
        "title": "加载更多"
      },
      {
        "id": "noMore",
        "title": "无新数据"
      },
      {
        "id": "activeIdList",
        "title": "更新数据"
      }
    ],
    "slots": [
      {
        "id": "card",
        "capacity": 1,
        "schema": "fangzhou/eshop/entity/commodity:1.0"
      }
    ]
  }
)

comAray.push({
    "title": "单列卡片3",
    "enable": true,
    "namespace": "fangzhou.normal-h5.commondity-card-s3",
    "schema": "fangzhou/eshop/entity/commodity:1.0",
    "icon": "https://ali-ec.static.yximgs.com/kos/nlav11092/商品.0dd0909de3c295f5.png",
    "author": "yangxian05",
    "author_name": "杨显",
    "version": "1.0.0",
    "description": "单列卡片",
    "data": require("./src/commodity-cards/s3/data.json"),
    "runtime": require("./src/commodity-cards/s3/runtime.tsx").default,
    "preview": "https://ali2.a.kwimgs.com/kos/nlav11092/1631521958781.a6f94bdde2f05cd9.png",
    "editors": "./editors.tsx",
    "inputs": [
      {
        "id": "install",
        "title": "安装"
      }
    ],
    "outputs": [
      {
        "id": "click",
        "title": "点击"
      }
    ]
  }
)

comAray.push({
    "title": "JS计算",
    "visibility": true,
    "namespace": "fangzhou.normal-pc.code.segment",
    "author": "xiechuanfang",
    "author_name": "谢传芳",
    "version": "1.0.0",
    "description": "JS计算",
    "icon": "https://ali2.a.kwimgs.com/udata/pkg/ks-merchant/fangzhou/static_picture/java-script.dd6d0de51f7fc441.svg",
    "runtime": require("./src/_code-segment/runtime.ts").default,
    "rtType": "js",
    "inputs": [
      {
        "id": "input0",
        "title": "输入项0"
      }
    ],
    "outputs": [
      {
        "id": "output0",
        "title": "输出项0"
      }
    ]
  }
)

comAray.push({
    "title": "弹窗",
    "enable": true,
    "namespace": "fangzhou.normal-h5.popup",
    "icon": "https://ali-ec.static.yximgs.com/kos/nlav11092/弹窗消息.d7e2800a7066d1c0.png",
    "author": "yangxian05",
    "author_name": "杨显",
    "version": "1.0.0",
    "description": "弹窗",
    "runtime": require("./src/popup/runtime").default,
    "data": require("./src/popup/data.json"),
    "slots": [
      {
        "id": "content",
        "title": "内容"
      }
    ],
    "inputs": [
      {
        "id": "show-popup",
        "title": "展示弹窗"
      },
      {
        "id": "hide-popup",
        "title": "隐藏弹窗"
      }
    ],
    "outputs": [
      {
        "id": "close-popup",
        "title": "关闭弹窗"
      }
    ]
  }
)


export default {
  id: 'fangzhou.ec-activities-common',
  title: '电商营销活动通用组件库',
  author: 'fangzhou team',
  icon: '',
  version: '1.0.0',
  comAray,
  //visible: true,
  //visible: false
}