import { ApplyRootStyleModifier, ApplyStyleModifier, ApplyFontStyleModifier, CSSProperties } from './styles/getDesignStyle'


export interface DataType {
  text: string
}

@ObservedV2
export class Data implements DataType {
  @Trace text: string

  constructor(config: DataType) {
    this.text = config.text
  }
}

interface Inputs {
  buttonText: (fn: (text: string) => void) => void
}

interface Outputs {
  onClick: (value: string) => void
}

@ComponentV2
export default struct Mybricks_Button {
  @Param data: Data = new Data({
    text: '按钮'
  });
  @Param styles: Record<string, CSSProperties> = {}
  @Param inputs?: Inputs = undefined;
  @Param outputs?: Outputs = undefined;

  aboutToAppear(): void {
    this.inputs?.buttonText((text) => {
      this.data.text = text;
    })
  }

  build() {
    Button({ type: ButtonType.Normal }) {
      Text(this.data.text)
        .attributeModifier(
          new ApplyFontStyleModifier(this.styles['.mybricks-button'])
            .fontSize(14)
            .fontColor('#ffffff')
        )
    }
    .height(40)
    .padding({
      top: 0,
      bottom: 0,
      left: 14,
      right: 14
    })
    .onClick(() => {
      this.outputs?.onClick(this.data.text)
    })
    .attributeModifier(new ApplyStyleModifier(this.styles['.mybricks-button']).borderRadius('50%').backgroundColor('#fa6400'))
    .attributeModifier(
      new ApplyRootStyleModifier(this.styles['root'])
    )
  }
}
