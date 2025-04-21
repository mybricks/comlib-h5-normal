# env 概述
- env 是组件运行时环境，可以获取到一些组件运行时信息，比如页面滚动信息。常见的 env 方法有：
  - 页面滚动相关：（当用户提到列表支持触底加载时，必须用以下的方法来实现，而不是再套一层scrollView组件！）
    - env?.rootScroll?.getBoundingClientRect() ！！必须用可选表达式，因为编辑环境可能为空！！
    - env?.rootScroll?.onScroll() ！！必须用可选表达式，因为编辑环境可能为空！！
    - env?.rootScroll?.scrollTo() ！！必须用可选表达式，因为编辑环境可能为空！！

# env 如何使用
env 在组件中可以这样引入然后使用：

```jsx file="runtime.jsx"
export default comDef(({ data, env, inputs, outputs, slots }) => {
    env?.rootScroll?.onScroll((res)=>{ // ！！必须用这种可选表达式，因为在编辑环境中，env可能为空，会导致报错！！
        //页面滚动时这里对接收到的滚动信息进行处理
    })
})
```

# env 注意事项
1. env 的引入必须是这种格式：`comRef(({ env, data, slots })`,和data、slots同级，不能单独引入。
2. 遇到rootScroll相关的需求时，必须使用以上列出的env.rootScroll方法，不准使用其他方法。
3. 如果需求涉及到触底加载，务必保证触底后变成加载态（此时不可重复触发触底逻辑），只有当监听到有追加数据时，才可再次触发触底逻辑。
4. 必须要用可选表达式来获取env，否则在编辑环境下会报错。
5. env获取不了当前是在小程序环境还是h5环境，请 `import * as Taro from '@tarojs/taro';` 并使用 `Taro.getEnv()` 来判断。



