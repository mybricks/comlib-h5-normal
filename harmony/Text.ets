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
  value: (fn: (text: string) => void) => void
}

interface Outputs {
  onClick: (value: string) => void
}

@ComponentV2
export default struct Mybricks_Text {
  @Param data: Data = new Data({
    text: '文本内容'
  });
  @Param styles: Record<string, CSSProperties> = {}
  @Param inputs?: Inputs = undefined;
  @Param outputs?: Outputs = undefined;

  aboutToAppear(): void {
    this.inputs?.value((text) => {
      this.data.text = text;
    })
  }

  build() {
    Column() {
      Text(this.data.text)
        .wordBreak(WordBreak.BREAK_WORD)
        .attributeModifier(
          new ApplyFontStyleModifier(this.styles['.mybricks-text'])
            .fontSize(14)
            .fontColor('#333333')
        )
    }.attributeModifier(
      new ApplyRootStyleModifier(this.styles['root'])
    )
  }
}
