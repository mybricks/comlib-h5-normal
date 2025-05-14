// import display from '@ohos.display';
import { ApplyRootStyleModifier, ApplyStyleModifier, CSSProperties } from './styles/getDesignStyle'

// let screenHeight = display.getDefaultDisplaySync().height;

export interface DataType {
  background: string
}


@ObservedV2
export class Data implements DataType {
  @Trace background: string

  constructor(config: DataType) {
    this.background = config.background
  }
}


interface Inputs {
}

interface Outputs {
}


export interface SlotsParams_content {
  id: string,
}
export interface SlotsParams {
  item: SlotsParams_content
}
@Builder function emptySlot(params: SlotsParams_content) {}

@ComponentV2
export default struct Mybricks_System_Page {
  @Param data: Data = new Data({
    background: '#ffffff'
  });
  @Param styles: Record<string, CSSProperties> = {}
  @Param inputs?: Inputs = undefined;
  @Param outputs?: Outputs = undefined;

  @BuilderParam slots: (id: SlotsParams_content) => void = emptySlot;

  aboutToAppear(): void {

  }

  build() {
    Column() {
      this.slots({
        id: 'content'
      })
    }.backgroundColor(this.data?.background)
    .alignItems(HorizontalAlign.Start)
    .align(Alignment.Start)
    .height('100%')
    .width('100%')
  }
}
