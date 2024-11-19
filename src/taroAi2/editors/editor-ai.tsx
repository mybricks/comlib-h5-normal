import { transformLess } from "../transform";
import { getComponentFromJSX, updateRender, updateStyle } from "../utils";
import getKnowledge from "./promote";

export default {
  ':root': {
    active: true,
    role: 'comDev',//定义AI的角色
    getSystemPrompts() {
      return {
        langs: "react、@tarojs/components、CSS、Javascript、Less、mybricks",
        // renderFileTemplate: `({env,data,inputs,outputs,slots}) => {
        //   return <View>HELLO WORLD</View>
        // }`,
        prompts: `
          ## 开发背景
          1.不允许使用原生HTML标签，必须使用@tarojs/components提供的组件。
          2.在对组件进行操作时，必须严格优先按照组件props定义的方法进行操作。
          3.所开发的组件将被应用在移动端，因此需要考虑移动端的适配问题，如：屏幕适配、触摸事件等。

          ## 组件摘要
          @tarojs/components库提供了如下组件:
          Image(图片),
          Label(展示标签、标题,点击标题触发控件的点击，用来改进表单组件的可用性),
          Picker(从底部弹起的滚动选择器,包含普通、多列、时间、日期、省市区选择器),
          Button(按钮,点击类优先考虑使用),,
          Checkbox(多选框),
          CheckboxGroup(多选框组),
          Editor(富文本编辑器),
          Form(表单、表单容器,所有表单的开发都需要使用),
          Input(输入框),
          Progress(进度条),
          RichText(富文本),
          RootPortal(脱离dom树,用于制作弹窗、弹出层，当用户要求制作一个弹窗时，必须使用这个组件),
          ScrollView(可滚动视图区域),
          Swiper(轮播图),
          SwiperItem(轮播图项),
          Text(文本),
          View(视图),
          Radio(单选框),
          RadioGroup(单选框组),
          Slider(滑动选择器、滑块),
          Switch(开关),
          Textarea(多行输入框),
          Video(视频),
          WebView(配置网址,嵌入显示网页).

          以下是类型定义:
          interface Target {
            id: string
            tagName: string
            dataset: {
              [key: string]: any
            }
          }
          interface BaseEventOrig<T = any> {
            type: string
            timeStamp: number
            target: Target
            currentTarget: Target
            detail: T
            preventDefault: () => void
            stopPropagation: () => void
          }
          type EventFunction<T = any> = (event: BaseEventOrig<T>) => void
          type ComponentType<T> = ComponentType<T>
          
          ## 样式能力
          1. 在为组件设置样式时，尽量不要使用内联样式，而是使用style文件进行样式设置。
          2. 有非常高的审美造诣，在用户提出配色/颜色选择需求时，你会考虑莫兰迪色系、清新自然系、海洋湖泊系等热门色系。
          3. 

          ## 知识文档
          一篇知识文档的结构一般由「使用文档」「最佳实践」构成，使用文档中可能包含组件的一些配置项。
        `,
        // examples:`
        // <例子>
        //   [user]：一张200*100的图片
        //   [assistant]：好的，我将为您开发一个图片组件.
        //   \`\`\`render
        //   import css from 'style.less';
        //   import {comRef} from 'mybricks';
        //   import {View,Image} from "@tarojs/components";
          
        //   export default comRef(({env,data,inputs})=>{
        //     return (
        //       <View>
        //         <Image src='https://temp.im/200x100' alt="200*100" />
        //       </View>
        //     )
        //   },{
        //     type:'main',
        //     title:'图片'
        //   })
        //   \`\`\`
          
        //   **总结**
        //   这是一个图片组件，展示一张200*100的图片，当前没有任何配置项、输入项、输出项以及插槽.
        // </例子>
        
        // <例子>
        //   [user]：一个banner
        //   [assistant]：好的，我将使为您开发一个Banner组件，包括Logo与导航内容.
        //   \`\`\`model
        //   {
        //     "logo":"MyBricks低代码",
        //     "navs":[
        //       {"id":"main","title":"主页"},
        //       {"id":"help","title":"帮助"}
        //     ]
        //   }
        //   \`\`\`
          
        //   \`\`\`style
        //   .banner{
        //     width:100%;
        //     height:100%;
        //     display:flex;
        //     justify-content:space-between;
        //   }
          
        //   .logo{
        //     width:100px;
        //     height:30px;
        //   }
          
        //   .search{
        //     width:200px;
        //   }
          
        //   .navs{
        //     flex:1; 
        //     display:flex;
            
        //     .item{
        //       margin-left:10px;
        //     }
        //   }
        //   \`\`\`
          
        //   \`\`\`render
        //   import css from 'style.less';
        //   import {comRef} from 'mybricks';
        //   import {View,Input} from "@tarojs/components";
          
        //   export default comRef(({data,inputs})=>{
        //     return (
        //       <View className={css.banner}>
        //         <View className={css.logo}>
        //           {data.logo}
        //         </View>
        //         <View className={css.search}>
        //           <Input type="text" placeholder="搜索" />
        //         </View>
        //         <View className={css.navs}>
        //           {
        //             data.navs.map((nav,idx)=>{
        //               return (
        //                 <View key={nav.id} className={css.item} data-selectors-title={'导航项'+idx}>
        //                   {nav.title}
        //                 </View>
        //               )
        //             })
        //           }
        //         </View>
        //       </View>
        //     )
        //   },{
        //     type:'main',
        //     title:'Banner',
        //     selectors:[
        //       {
        //         selector:'.logo',
        //         title:'Logo',
        //         configs:[
        //           {
        //             title:'Logo',
        //             type:'text',
        //             value:{
        //               get({data}){
        //                 return data.logo
        //               },
        //               set({data},val){
        //                 data.logo = val
        //               }
        //             }
        //           }
        //         ]
        //       },
        //       {
        //         selector:'.search',
        //         title:'搜索'
        //       },
        //       {
        //         selector:'.navs',
        //         title:'导航栏'
        //       },
        //       {
        //         selector:'.navs .item',
        //         title:'导航项'
        //       }
        //     ]
        //   })
        //   \`\`\`
          
        //   **总结**
        //   这是一个Banner组件，包括Logo与导航内容。
        // </例子>
        
        // <例子>
        //   (当前选区在 logo(selector=.logo) 上)
        //   [user]：这里加个黑色的背景
        //   [assistant]：好的，我将为您在logo区域的样式上修改背景色，当前需要更新style文件，以下是style文件的所有内容.
        //   \`\`\`style
        //   .banner{
        //     width:100%;
        //     height:100%;
        //     display:flex;
        //     justify-content:space-between;
        //   }
          
        //   .logo{
        //     width:100px;
        //     height:30px;
        //     background-color:#000;
        //   }
          
        //   .search{
        //     width:200px;
        //   }
          
        //   .navs{
        //     flex:1; 
        //     display:flex;
            
        //     .item{
        //       margin-left:10px;
        //     }
        //   }
        //   \`\`\`
        // </例子>
        
        // <例子>
        //   (当前选区在 搜索(selector=.search) 上)
        //   [user]：我要配置这里的placeholder
        //   [assistant]：好的，我将为您在这个区域添加一个配置项，当前需要更新model及render文件.
        
        //   \`\`\`model
        //   {
        //     "logo":"MyBricks低代码",
        //     "search":{
        //       "placeholder":"搜索"
        //     },
        //     "navs":[
        //       {"id":"main","title":"主页"},
        //       {"id":"help","title":"帮助"}
        //     ]
        //   }
        //   \`\`\`
        
        //   \`\`\`render
        //   import css from 'style.less';
        //   import {comRef} from 'mybricks';
        //   import {View,Input} from "@tarojs/components";
          
        //   export default comRef(({data,inputs})=>{
        //     return (
        //       <View className={css.banner}>
        //         <View className={css.logo}>
        //           {data.logo}
        //         </View>
        //         <View className={css.search}>
        //           <Input type="text" placeholder={data.search.placeholder} />
        //         </View>
        //         <View className={css.navs}>
        //           {
        //             data.navs.map((nav,idx)=>{
        //               return (
        //                 <View key={nav.id} className={css.item} data-selectors-title={'导航项'+idx}>
        //                   {nav.title}
        //                 </View>
        //               )
        //             })
        //           }
        //         </View>
        //       </View>
        //     )
        //   },{
        //     type:'main',
        //     title:'Banner',
        //     selectors:[
        //       {
        //         selector:'.logo',
        //         title:'Logo',
        //         configs:[
        //           {
        //             title:'Logo',
        //             type:'text',
        //             value:{
        //               get({data}){
        //                 return data.logo
        //               },
        //               set({data},val){
        //                 data.logo = val
        //               }
        //             }
        //           }
        //         ]
        //       },
        //       {
        //         selector:'.search',
        //         title:'搜索',
        //         configs:[
        //           {
        //             title:'placeholder',
        //             type:'text',
        //             value:{
        //               get({data}){
        //                 return data.search.placeholder
        //               },
        //               set({data},val){
        //                 data.search.placeholder = val
        //               }
        //             }
        //           }
        //         ]
        //       },
        //       {
        //         selector:'.navs',
        //         title:'导航栏'
        //       },
        //       {
        //         selector:'.navs .item',
        //         title:'导航项'
        //       }
        //     ]
        //   })
        //   \`\`\`
          
        //   **总结**
        //   此次修改，在区域 搜索(selector=.search) 添加了一个配置项.
          
        //   以下是这个被添加的配置项的详细情况：
        //   title：placeholder
        //   type:text
        // </例子>
        
        // <例子>
        //   (当前选区在 搜索(selector=.search) 上)
        //   [user]：这里当值变化时，要输出当前值
        //   [assistant]：OK，没问题，我将在组件的outputs中添加一个输出项，并在当前搜索框上增加onChange事件，以通过该输出项输出当前的搜索框的值。
        //   仅需要修改render文件：
        //   \`\`\`render
        //   import css from 'style.less';
        //   import {comRef} from 'mybricks';
        //   import {useCallback} from 'react';
        //   import {View,Input} from "@tarojs/components";
          
        //   export default comRef(({data,inputs,outputs})=>{
        //     const search = useCallback((e)=>{
        //       outputs['o_012'](e.target.value)
        //     },[])
            
        //     return (
        //       <View className={css.banner}>
        //         <View className={css.logo}>
        //           {data.logo}
        //         </View>
        //         <View className={css.search}>
        //           <Input type="text" placeholder={data.search.placeholder} onChange={search}/>
        //         </View>
        //         <View className={css.navs}>
        //           {
        //             data.navs.map((nav,idx)=>{
        //               return (
        //                 <View key={nav.id} className={css.item} data-selectors-title={'导航项'+idx}>
        //                   {nav.title}
        //                 </View>
        //               )
        //             })
        //           }
        //         </View>
        //       </View>
        //     )
        //   },{
        //     type:'main',
        //     title:'Banner',
        //     outputs:[
        //       {id:'o_012',title:'搜索',schema:{type:'string'}}
        //     ],
        //     selectors:[
        //       {
        //         selector:'.logo',
        //         title:'Logo',
        //         configs:[
        //           {
        //             title:'Logo',
        //             type:'text',
        //             value:{
        //               get({data}){
        //                 return data.logo
        //               },
        //               set({data},val){
        //                 data.logo = val
        //               }
        //             }
        //           }
        //         ]
        //       },
        //       {
        //         selector:'.search',
        //         title:'搜索',
        //         configs:[
        //           {
        //             title:'placeholder',
        //             type:'text',
        //             value:{
        //               get({data}){
        //                 return data.search.placeholder
        //               },
        //               set({data},val){
        //                 data.search.placeholder = val
        //               }
        //             }
        //           }
        //         ]
        //       },
        //       {
        //         selector:'.navs',
        //         title:'导航栏'
        //       },
        //       {
        //         selector:'.navs .item',
        //         title:'导航项'
        //       }
        //     ]
        //   })
        //   \`\`\`
          
        //   **总结**
        //   此次修改，添加了一个输出项，并在搜索(selector=.search)中添加了一个事件，当值变化时触发。
          
        //   以下是这个被添加的输出项的详细情况：
        //   title：搜索
        //   schema:{type:'string'}
        // </例子>
        
        // <例子>
        //   [user]：根据输入显示导航列表
        //   [assistant]：好的，我将为您添加一个输入项，根据输入项的值显示导航。本次需要更新render文件：
        //   \`\`\`render
        //   import css from 'style.less';
        //   import {comRef} from 'mybricks';
        //   import {useMemo,useCallback} from 'react';
        //   import {View,Input} from "@tarojs/components";
          
        //   export default comRef(({data,inputs,outputs})=>{
        //     useMemo(()=>{
        //       inputs['u_i6']((val)=>{
        //         data.navs = val
        //       })
        //     },[])
            
        //     const search = useCallback((e)=>{
        //       outputs['o_012'](e.target.value)
        //     },[])
            
        //     return (
        //       <View className={css.banner}>
        //         <View className={css.logo}>
        //           {data.logo}
        //         </View>
        //         <View className={css.search}>
        //           <Input type="text" placeholder={data.search.placeholder} onChange={search}/>
        //         </View>
        //         <View className={css.navs}>
        //           {
        //             data.navs.map((nav,idx)=>{
        //               return (
        //                 <View key={nav.id} className={css.item} data-selectors-title={'导航项'+idx}>
        //                   {nav.title}
        //                 </View>
        //               )
        //             })
        //           }
        //         </View>
        //       </View>
        //     )
        //   },{
        //     type:'main',
        //     title:'Banner',
        //     inputs:[
        //       {
        //         id:'u_i6',
        //         title:'导航列表',
        //         schema:{
        //           type:'array',
        //           items:{
        //             type:'object',
        //             properties:{
        //               id:{
        //                 type:'string'
        //               },
        //               title:{
        //                 type:'string'
        //               }
        //             }
        //           }
        //         }
        //       }
        //     ],
        //     outputs:[
        //       {id:'o_012',title:'搜索',schema:{type:'string'}}
        //     ],
        //     selectors:[
        //       {
        //         selector:'.logo',
        //         title:'Logo',
        //         configs:[
        //           {
        //             title:'Logo',
        //             type:'text',
        //             value:{
        //               get({data}){
        //                 return data.logo
        //               },
        //               set({data},val){
        //                 data.logo = val
        //               }
        //             }
        //           }
        //         ]
        //       },
        //       {
        //         selector:'.search',
        //         title:'搜索',
        //         configs:[
        //           {
        //             title:'placeholder',
        //             type:'text',
        //             value:{
        //               get({data}){
        //                 return data.search.placeholder
        //               },
        //               set({data},val){
        //                 data.search.placeholder = val
        //               }
        //             }
        //           }
        //         ]
        //       },
        //       {
        //         selector:'.navs',
        //         title:'导航栏'
        //       },
        //       {
        //         selector:'.navs .item',
        //         title:'导航项'
        //       }
        //     ]
        //   })
        //   \`\`\`
          
        //   **总结**
        //   此次修改，在组件上添加一个输入项，根据输入项的值显示导航。
          
        //   以下是这个被添加的输入项的详细情况：
        //   title：导航列表
        //   schema:
        //     {
        //       type:'array',
        //       items:{
        //         type:'object',
        //         properties:{
        //           id:{
        //             type:'string'
        //           },
        //           title:{
        //             type:'string'
        //           }
        //         }
        //       }
        //     }
        // </例子>
        
        // <例子>
        //   (当前选区在 联系人描述(selector=.desc) 上)
        //   [user]：这里再拆分一下
        //   [assistant]：好的，我将当前选区的基础上拆分更具体的选区，以便于您的编辑操作。
        //   仅需要修改render文件：
          
        //   \`\`\`render
        //   import css from 'style.less';
        //   import {comRef} from 'mybricks';
        //   import {View} from "@tarojs/components";
          
        //   export default comRef(({data,inputs})=>{
        //     return (
        //       <View className={css.card}>
        //         <View className={css.name}>
        //           {data.name}
        //         </View>
        //         <View className={css.desc}>
        //           <View className={css.phone}>电话</View>
        //           <View className={css.address}>联系人地址</View>
        //         </View>
        //       </View>
        //     )
        //   },{
        //     type:'main',
        //     title:'联系人卡片',
        //     selectors:[
        //       {
        //         selector:'.name',
        //         title:'姓名'
        //       },
        //       {
        //         selector:'.desc',
        //         title:'描述'
        //       },
        //       {
        //         selector:'.desc .phone',
        //         title:'电话'
        //       },
        //       {
        //         selector:'.desc .address',
        //         title:'地址'
        //       }
        //     ]
        //   })
        //   \`\`\`
          
        //   **总结**
        //   本次在选区 描述(selector=.desc)上拆分了更具体的选区:
        //   - 电话(selector=.desc .phone)
        //   - 地址(selector=.desc .address)
        // </例子>
        
        // <例子>
        //   [user]：在下方添加一个饼图
        //   [assistant]：目前能够使用的类库中不包括饼图组件，我将为您添加一个插槽，您可以将其他饼图组件拖入其中。
        //   本次仅需要修改render文件
        //   \`\`\`render
        //   import css from 'style.less';
        //   import {comRef} from 'mybricks';
        //   import {View} from "@tarojs/components";
          
        //   export default comRef(({data,inputs,slots})=>{
        //     return (
        //       <View className={css.card}>
        //         <View className={css.name}>
        //           {data.name}
        //         </View>
        //         <View className={css.desc}>
        //           <View className={css.phone}>电话</View>
        //           <View className={css.address}>联系人地址</View>
        //         </View>
        //         <View>
        //           {slots['s_001'].render()}
        //         </View>
        //       </View>
        //     )
        //   },{
        //     type:'main',
        //     title:'联系人卡片',
        //     slots:[
        //       {id:'s_001',title:'饼图'}
        //     ],
        //     selectors:[
        //       {
        //         selector:'.name',
        //         title:'姓名'
        //       },
        //       {
        //         selector:'.desc',
        //         title:'描述'
        //       },
        //       {
        //         selector:'.desc .phone',
        //         title:'电话'
        //       },
        //       {
        //         selector:'.desc .address',
        //         title:'地址'
        //       }
        //     ]
        //   })
        //   \`\`\`
        // </例子>`
      }
    },
    loadKnowledge(items) {
      console.log("loadKnowledge", items);
      const rtn = []

      items.forEach(now => {
        const lib = now.lib || now.from
        if (!lib.match(/react/)) {
          if (lib === "@tarojs/components") {
            const upperCom = now.item.toUpperCase()
            const knowledge = getKnowledge(lib, upperCom)
            if (knowledge) {
              rtn.push({
                from: lib,
                lib,
                item: now.item,
                knowledge
              })
            }
          }
        }
      })

      return rtn
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