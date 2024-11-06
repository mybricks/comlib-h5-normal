import { transformLess } from "../transform";
import { getComponentFromJSX, updateRender, updateStyle } from "../utils";

export default {
  ':root': {
    active: true,
    role: 'comDev',//定义AI的角色
    getSystemPrompts() {
      console.log("进来getSystemPrompts")
      return `
    对于小程序、h5需求，首选基于 taro 进行开发.
    如果 taro 组件库中的组件确实不能满足需求，才可以基于react、html进行 普通h5 开发。
    
    以下是Taro支持的组件列表，请根据需求选择组件进行开发。
    组件名称 组件说明
    # 轮播组件 Swiper & SwiperItem
    ## 轮播的 最佳实践

    render
      import {useMemo} from 'react';
      import {comRef} from 'mybricks';//使用mybricks中的comRef包裹组件
      import {Swiper, SwiperItem} from '@tarojs/components';//@tarojs/components中的组件
      import css from 'style.less';//style.less为返回的less代码
      
      /**
      * @param env 环境对象
      * @param data 数据，对应model数据
      * @param inputs 输入项
      * @param outputs 输出项
      * @param slots 插槽
      */
      export default comRef(({env,data,inputs,outputs,slots})=>{
      // 当前选中的tab
  const [current, setCurrent] = useState(0);
  const [loadedImages, setLoadedImages] = useState([
    current,
    current + 1,
    data.items?.length ? data.items?.length - 1 : 0,
  ]); // 默认加载第一个和最后一个图片

  //判断是否是真机运行态
  const isRelEnv = useMemo(() => {
    if (env.runtime.debug || env.edit) {
      return false;
    } else {
      return true;
    }
  }, [env.runtime.debug, env.edit])

  useEffect(() => {
    if (env.edit && !isUndef(data?.edit?.current)) {
      setCurrent(data?.edit?.current);
    }
  }, [env.edit, data?.edit?.current]);

  useEffect(() => {
    inputs["setItems"]((val) => {
      data.items = val;
    });
  }, []);

  const onClick = useCallback(({ item, index }) => {
    // if (item.customLink) {
    //   Taro.navigateTo({
    //     url: item.customLink,
    //     fail: () => {
    //       Taro.switchTab({
    //         url: item.customLink,
    //       });
    //     },
    //   });
    //   return;
    // }
    outputs["onClick"]?.({ item, index });
  }, []);

  const showIndicator = useMemo(() => {
    return data.showIndicator ?? true;
  }, [data.showIndicator]);

  const extra = useMemo(() => {
    if (env.edit) {
      return {
        autoplay: false,
        duration: 0,
      };
    }
    return {
      autoplay: !env.edit && !!data.autoplay,
      interval: data.interval || 5000,
      duration: data.duration ?? 500,
    };
  }, [env.edit, data.autoplay, data.duration]);

  const onChange = useCallback((e) => {
    let source = e.detail.source
    if (env?.edit) {
      return;
    }
    if(source === 'autoplay' || source === 'touch') {
      setCurrent(e.detail?.current)
    }
  }, []);

  useEffect(() => {
    setLoadedImages((c) => {
      const newLoadedImages = new Set(c);
      if (current + 1 < data.items.length) {
        newLoadedImages.add(current + 1); // 预加载后面一张图片
        return Array.from(newLoadedImages);
      }
      return c;
    });
  }, [current, data.items.length]);

  if (env.runtime && !data.items.length) {
    return null;
  }

  if (env.edit && !data.items.length) {
    return <EmptyCom title="请配置幻灯片" />;
  }

  return (
    <Swiper
      env={env}
      data={data}
      className={css.swiper}
      style={{ height: style.height }}
      current={current}
      onChange={onChange}
      indicator={showIndicator}
      circular={env.edit ? false : data.circular}
      {...extra}
    >
      {!isRelEnv && <SwiperItem
        className={css.swiperItem}
      >
        <SkeletonImage
          className={css.thumbnail}
          mode="aspectFill"
          src={data.items[current]?.thumbnail}
          nativeProps={{
            loading: "lazy",
            decoding: "async",
          }}
          cdnCut="auto"
          cdnCutOption={{ width: style.width, height: style.height }}
        />
      </SwiperItem>}
      {isRelEnv && data.items.map((item, index) => {
        // 搭建态下加载全部
        const shouldLoad = loadedImages.includes(index);
        return (
          <SwiperItem
            key={item._id}
            className={css.swiperItem}
            onClick={() => {
              onClick({ item, index });
            }}
          >
            <SkeletonImage
              className={css.thumbnail}
              mode="aspectFill"
              src={shouldLoad ? item.thumbnail : ""}
              nativeProps={{
                loading: "lazy",
                decoding: "async",
              }}
              cdnCut="auto"
              cdnCutOption={{ width: style.width, height: style.height }}
            />
          </SwiperItem>
        );
      })}
    </Swiper>
  );  },{
        type:'main',//主组件
        title:'swiper',//组件标题
        inputs:[//定义输入项
          {id:'u_i6',title:'标题',schema:{type:'string'}}
        ],
        outputs:[//定义输出项
          {id:'o_03',title:'点击标题',schema:{type:'string'}}
        ],
      })
    `
    },
    getComDocs() {
      //没用可以忽略
      debugger
    },
    preview(response: { id, render, style }, edtCtx, libs: { mybricksSdk }) {
      return new Promise((resolve, reject) => {
        if (response) {
          const rtn = (com, css) => {
            resolve({
              com,
              css
            })
          }

          Promise.all([
            new Promise((resolve, reject) => {
              getComponentFromJSX(response.render, libs).then(com => {
                resolve(com)
              })
            }),
            new Promise((resolve, reject) => {
              transformLess(response.style).then(css => {
                const myContent = css.replaceAll('__id__', response.id)//替换模版
                resolve(myContent)
              })
            })
          ]).then(([com, css]) => {
            rtn(com, css)
          }).catch(e => {
            reject(e)
          })
        }
      })
    },
    execute({ id, data, inputs, outputs, slots },
      response: { render, style }, { refresh } = {}) {
      return new Promise((resolve, reject) => {
        if (response.render) {
          updateRender({ data }, response.render)
        }

        if (response.style) {
          updateStyle({ id, data }, response.style)
        }

        resolve()
      })
    }
  }
}