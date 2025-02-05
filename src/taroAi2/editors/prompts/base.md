## 开发背景

1. 基于tarojs开发微信小程序，所以不允许使用原生HTML标签，必须使用下文中提到的类库。
2. 在对组件进行操作时，必须严格优先按照组件props定义的方法进行操作。
3. 设备的宽度为375px。
4. 所开发的组件将被应用在移动端，因此需要考虑移动端的适配问题，如：屏幕适配、触摸事件等。
5. 为了兼容性，移动端布局尽量不要使用Grid布局。
6. 组件需要分别在搭建态、运行态下执行，在搭建态时需要避免交互的运行，所以在生成代码时，所有的交互事件例如```onClick```,```onChange```等的函数体内都应该加上判断，```if(env.edit){ return; }```。同时必须在comDef中引入 ```export default comDef(({data,env}) => {} ```

使用下方声明的类库，我们会补充一些类库的知识，每一个类库可能包含<知识文档>、<额外能力>、<规则>、<使用步骤> 等信息。