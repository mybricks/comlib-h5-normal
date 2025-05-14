import BasicButton, { DataType as ButtonDataType, Data as ButtonData } from "./Button";
import BasicSystemPage, { DataType as SystemPageDataType, Data as SystemPageData } from "./SystemPage";
import BasicText, { DataType as TextDataType, Data as TextData } from "./Text";
import BasicImage, { DataType as ImageDataType, Data as ImageData } from "./Image";
import BasicList, { DataType as ListDataType, Data as ListData } from "./List"
import BasicPopup, { DataType as PopupDataType, Data as PopupData } from "./Popup"
import basicCodes from "./codes";

import { inputs, inputs2 } from "./mybricks"

type Style = Record<string, string | number>;
type Styles = Record<string, Style>;

class MyBricksColumnModifier implements AttributeModifier<ColumnAttribute> {
  style: Style;

  constructor(style: Style) {
    this.style = style;
  }

  applyNormalAttribute(instance: ColumnAttribute): void {
    console.log("[MyBricks - MyBricksColumnModifier]", JSON.stringify(this.style))
    const style = this.style;
    // width
    instance.width(style.width);
    // height
    instance.height(style.height);
    // marginTop
    // marginBottom
    // marginLeft
    // marginRight
    instance.margin({
      top: style.marginTop,
      right: style.marginRight,
      bottom: style.marginBottom,
      left: style.marginLeft
    })
    // flex
    if (typeof style.flex === "number") {
      instance.flexGrow(style.flex as number)
      instance.flexShrink(1)
      instance.flexBasis("0%")
    }
    // position
    if (["absolute", "fixed"].includes(style.position as string)) {
      instance.position({
        top: style.top as number,
        left: style.left as number,
        right: style.right as number,
        bottom: style.bottom as number,
      })
    }
  }
}

@Builder function Slot(params: MyBricks.SlotParams) {}

interface MyBricksButtonControllerButtonTextRelOutputs {
  buttonTextDone: MyBricks.EventValue;
}

// 出码生成各组件的Events
export class MyBricksButtonEvents {
  onClick = (value: MyBricks.EventValue) => {}
}

interface MyBricksButtonControllerType {
  buttonText: (value: MyBricks.EventValue) => MyBricksButtonControllerButtonTextRelOutputs;
  // 内置的显示隐藏逻辑
  show: (value: MyBricks.EventValue) => void;
  hide: (value: MyBricks.EventValue) => void;
  showOrHide: (value: MyBricks.EventValue) => void;
}
export const MyBricksButtonController = () => {
  return inputs2({}, true) as MyBricksButtonControllerType
}

@ComponentV2
export struct MyBricksButton {
  @Param controller: MyBricksButtonControllerType = MyBricksButtonController();
  @Param @Require data: ButtonDataType;
  @Param events: MyBricksButtonEvents = new MyBricksButtonEvents();
  @Param styles: Styles = {};
  @Local columnVisibility: Visibility = Visibility.Visible;

  myBricksColumnModifier = new MyBricksColumnModifier(this.styles.root)

  build() {
    Column() {
      BasicButton({
        data: new ButtonData(this.data),
        inputs: inputs2(this),
        outputs: this.events,
        styles: this.styles
      })
    }
    .attributeModifier(this.myBricksColumnModifier)
    .visibility(this.columnVisibility)
  }
}


// -- 页面 --
interface MyBricksSystemPageControllerType {

}
export const MyBricksSystemPageController = () => {
  return inputs2({}, true) as MyBricksSystemPageControllerType
}

@ComponentV2
export struct MyBricksSystemPage {
  @Param controller: MyBricksSystemPageControllerType = MyBricksSystemPageController();
  @Param @Require data: SystemPageDataType;
  @Param styles: Styles = {};

  @BuilderParam slots : (params: MyBricks.SlotParams) => void = Slot;

  build() {
    BasicSystemPage({
      data: new SystemPageData(this.data),
      slots: this.slots
    })
  }
}

// -- 文本 --
interface MyBricksTextControllerType {
  value: (value: MyBricks.EventValue) => void;
}

export const MyBricksTextController = () => {
  return inputs2({}, true) as MyBricksTextControllerType
}

class MyBricksTextEvents {
  onClick = (value: MyBricks.EventValue) => {}
}

@ComponentV2
export struct MyBricksText {
  @Param controller: MyBricksTextControllerType = MyBricksTextController();
  @Param @Require data: TextDataType;
  @Param events: MyBricksTextEvents = new MyBricksTextEvents()
  @Param styles: Styles = {};

  build() {
    BasicText({
      data: new TextData(this.data),
      inputs: inputs2(this),
      outputs: this.events,
      styles: this.styles
    })
  }
}

// -- 图片 --
interface MyBricksImageControllerType {
  setSrc: (text: MyBricks.EventValue) => void;
}

export const MyBricksImageController = () => {
  return inputs2({}, true) as MyBricksImageControllerType
}

interface MyBricksImageEvents {
  onClick: (value: MyBricks.EventValue) => void;
  onLoad: (value: MyBricks.EventValue) => void;
  onError: (value: MyBricks.EventValue) => void;
}

@ComponentV2
export struct MyBricksImage {
  @Param controller: MyBricksImageControllerType = MyBricksImageController();
  @Param @Require data: ImageDataType;
  @Param events: MyBricksImageEvents = {
    onClick: (value: MyBricks.EventValue): void => {
      console.log("[MyBricks] - Function not implemented.");
    },
    onLoad: (value: MyBricks.EventValue): void => {
      console.log("[MyBricks] - Function not implemented.");
    },
    onError: (value: MyBricks.EventValue): void => {
      console.log("[MyBricks] - Function not implemented.");
    }
  }
  @Param styles: Styles = {};

  build() {
    BasicImage({
      data: new ImageData(this.data),
      inputs: inputs2(this),
      outputs: this.events,
      styles: this.styles
    })
  }
}



// -- 列表 --
interface MyBricksContainerListControllerType {
  addDataSource: (value: MyBricks.EventValue) => void;
  refreshDataSource: (value: MyBricks.EventValue) => void;
}

export const MyBricksContainerListController = () => {
  return inputs2({}, true) as MyBricksContainerListControllerType
}

@ComponentV2
export struct MyBricksContainerList {
  @Param controller: MyBricksContainerListControllerType = MyBricksContainerListController();
  @Param @Require data: ListDataType;
  @Param styles: Styles = {};

  @BuilderParam slots : (params: MyBricks.SlotParams) => void = Slot;

  build() {
    BasicList({
      data: new ListData(this.data),
      inputs: inputs2(this),
      styles: this.styles,
      slots: this.slots
    })
  }
}

/** 弹窗 */
export class MyBricksPopupEvents {
  onClose = (value: MyBricks.EventValue) => {}
  onClickOverlay = (value: MyBricks.EventValue) => {}
}

interface MyBricksPopupControllerType {

}
export const MyBricksPopupController = () => {
  return inputs2({}, true) as MyBricksPopupControllerType
}

@ComponentV2
export struct MyBricksPopup {
  @Param controller: MyBricksPopupControllerType = MyBricksPopupController();
  @Param @Require data: PopupDataType;
  @Param events: MyBricksPopupEvents = new MyBricksPopupEvents()
  @Param styles: Styles = {};

  @BuilderParam slots : (params: MyBricks.SlotParams) => void = Slot;

  build() {
    BasicPopup({
      data: new PopupData(this.data),
      inputs: inputs2(this),
      outputs: this.events,
      styles: this.styles,
      slots: this.slots,
    })
  }
}


/** JS计算 */
const codes: MyBricks.Codes = Object.keys(basicCodes).reduce((pre, key) => {
  pre[key] = (props: MyBricks.JSParams): MyBricks.JSReturn => {
    return inputs(basicCodes[key], props);
  }
  return pre
}, {} as MyBricks.Codes)

export {
  codes
}
