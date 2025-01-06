# Editor - 富文本编辑器，可以对图片、文字进行编辑。
> 编辑器导出内容支持带标签的 html和纯文本的 text，编辑器内部采用 delta 格式进行存储。

> 通过 setContents 接口设置内容时，解析插入的 html 可能会由于一些非法标签导致解析错误，建议开发者在小程序内使用时通过 delta 进行插入。

> 富文本组件内部引入了一些基本的样式使得内容可以正确的展示，开发时可以进行覆盖。需要注意的是，在其它组件或环境中使用富文本组件导出的 html 时，需要额外引入 这段样式，并维护 `<ql-container><ql-editor></ql-editor></ql-container>` 的结构。

> 图片控件仅初始化时设置有效。

> *编辑器内支持部分 HTML 标签和内联样式，不支持 **class** 和 **id***

## 类型
```tsx
ComponentType<EditorProps>
```

## 最佳实践
- 请注意，如果用户要开发一个富文本编辑器，必须严格按照下方的示例来做。

```json file="model.json"
{
  "value": "",
  "placeholder": "请输入内容",
  "type": "text",
  "disabled": false
}
```

```jsx file="runtime.jsx"
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Editor, View, Image } from '@tarojs/components';
import * as Taro from "@tarojs/taro";
import { comDef } from 'mybricks';
import css from 'style.less';

//下面是图标，不能省略
const boldIcon = `https://assets.mybricks.world/hUOViBP3ohSJJDJNST8AGu6DwO4jrsL0-1732074614093.png`;
const undoIcon = `https://assets.mybricks.world/UYt6gtgsgUciIy3cEZYERqitzoUZah6a-1732074739214.png`;
const redoIcon = `https://assets.mybricks.world/maPE3g6WxzkyvSTuKQuZYajmgYNC6OGJ-1732074820848.png`;
//上面是图标，不能省略

export default comDef(({ data, env, inputs, outputs, slots }) => {
  const [value, setValue] = useState(data.value);
  const [ready, setReady] = useState(false);
  const [contentPool, setContentPool] = useState(null);
  const [useFixedToolbar, setUseFixedToolbar] = useState(false);
  const [useBold, setUseBold] = useState(false);

  const editorRef = useRef(null);
  const sanitizedId = useMemo(() => {
    return "editor" + Math.random().toString(36).substr(2, 9);
  }, []);

  const toggleBold = () => {
    if (!ready) {
      return;
    }
    editorRef.current?.format?.("bold");
  }

    const undo = useCallback(() => {
    if (!ready) {
      return;
    }

    editorRef.current?.undo?.();
  }, [ready]);

  const redo = useCallback(() => {
    if (!ready) {
      return;
    }

    editorRef.current?.redo?.();
  }, [ready]);

  useEffect(() => {
    if (!env.runtime) {
      return;
    }
    const query = Taro.createSelectorQuery().select(`.${sanitizedId} .editor`).boundingClientRect();
    query.exec((res) => {
      Taro.eventCenter.on('scroll', (e) => {
        if (res[0]?.top < 0 && res[0]?.bottom > 40) {
          setUseFixedToolbar(true);
        } else {
          setUseFixedToolbar(false);
        }
      });
    });
  }, [sanitizedId]);

  const onChange = useCallback(() => {
    editorRef.current.getContents({
      success: (res) => {
        setValue(res.html);
      },
    });
  }, [editorRef.current]);

  const onEditorReady = useCallback(() => {
    console.log("编辑器准备就绪",sanitizedId)
    if (!env.runtime) {
      return;
    }
    Taro.createSelectorQuery()
      .select(`.mybricks_com >>> .${sanitizedId}e`)
      .context((res) => {
        console.log("context",res)
        editorRef.current = res.context;
        setReady(true);
        if (contentPool?.value) {
          editorRef.current.setContents({
            html: contentPool.value,
            success: () => {
              setValue(contentPool.value);
              contentPool.output?.(contentPool.value);
            },
          });
        }
      })
      .exec();
  }, [sanitizedId, contentPool]);

  return (
    <View
      id={sanitizedId}
      className={css.editor}
    >
      <View
        className={`${css.toolbar} ${useFixedToolbar ? css.fixed : ''}`}
      >
        <View
          className={`${css.item} ${useBold ? css.active : ''}`}
          onClick={toggleBold}
        >
          <Image className={css.icon} src={boldIcon} />
        </View>

        <View className={css.divider}></View>
            <View className={css.item} onClick={undo}>
              <Image className={`.mybricks-backward ${css.icon}`} src={undoIcon}></Image>
            </View>
            <View className={css.item} onClick={redo}>
              <Image className={`.mybricks-forward ${css.icon}`} src={redoIcon}></Image>
            </View>
      </View>

      <Editor
        className={`${css.input} ${sanitizedId}e`}
        value={value}
        type={data.type}
        placeholder={data.placeholder}
        disabled={data.disabled}
        onReady={onEditorReady}
        onInput={onChange}
      >
      富文本编辑器仅支持微信小程序
      </Editor>
    </View>
  );
}, {
  type: "main"
  title: "组件",
});
```

```less file="style.less"
.editor {
  width: 100%;
  height: 100%;
  overflow: visible;
  position: relative;
  background: #ffffff;

  display: flex;
  flex-direction: column;

  .input {
    height: 100%;
    min-height: 210px;
    padding: 8px;
    font-size: 14px;
    line-height: 22px;
    padding-top: 40px;
    :global {
      .editor-image {
        display: block;
        margin-bottom: 8px;
      }
    }
  }

  .placeholder {
    width: 100%;
    height: 40px;
  }

  .toolbar {
    display: flex;
    background: #ffffff;
    border-bottom: 1px solid #cccccc;
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    padding-left: 8px;
    padding-right: 8px;

    &.fixed {
      position: fixed;
    }

    .item {
      width: 40px;
      height: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      .icon {
        position: relative;
        display: block;
        width: 24px;
        height: 24px;
        z-index: 2;
      }
      &.active::before {
        z-index: 1;
        content: "";
        display: block;
        width: 30px;
        height: 30px;
        background: rgba(200, 203, 207, 0.4);
        border-radius: 3px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .divider {
      width: 1px;
      height: 20px;
      background: #cccccc;
      margin: 10px 8px;
      margin-left: auto;
    }
  }
}
```

## EditorProps

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | :---: | :---: | --- |
| readOnly | `boolean` | `false` | 否 | 设置编辑器为只读 |
| placeholder | `string` |  | 否 | 提示信息 |
| showImgSize | `boolean` | `false` | 否 | 点击图片时显示图片大小控件 |
| showImgToolbar | `boolean` | `false` | 否 | 点击图片时显示工具栏控件 |
| showImgResize | `boolean` | `false` | 否 | 点击图片时显示修改尺寸控件 |
| onReady | `EventFunction` |  | 否 | 编辑器初始化完成时触发 |
| onFocus | `EventFunction` |  | 否 | 编辑器聚焦时触发 |
| onBlur | `EventFunction` |  | 否 | 编辑器失去焦点时触发<br />detail = { html, text, delta } |
| onInput | `EventFunction` |  | 否 | 编辑器内容改变时触发<br />detail = { html, text, delta } |
| onStatusChange | `EventFunction` |  | 否 | 通过 Context 方法改变编辑器内样式时触发，返回选区已设置的样式 |