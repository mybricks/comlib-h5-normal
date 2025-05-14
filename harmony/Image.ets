import { ApplyRootStyleModifier, ApplyStyleModifier, ApplyFontStyleModifier, CSSProperties } from './styles/getDesignStyle'

@Extend(Image) function aspectFit() {
  .objectFit(ImageFit.Contain)
  .overlay('Contain', { align: Alignment.Bottom, offset: { x: 0, y: 0 } })
}

@Extend(Image) function cover() {
  .objectFit(ImageFit.Cover)
  .overlay('Cover', { align: Alignment.Bottom, offset: { x: 0, y: 0 } })
}

export interface DataType {
  src?: string
  svgPolyfill?: string
  mode?: 'aspectFit' | 'cover' | string
}

@ObservedV2
export class Data implements DataType {
  @Trace src?: string
  @Trace svgPolyfill?: string
  @Trace mode?: 'aspectFit' | 'cover' | string

  constructor(config: DataType) {
    this.src = config.src
    this.svgPolyfill = config.svgPolyfill
    this.mode = config.mode
  }
}

interface Inputs {
  setSrc: (fn: (src: string) => void) => void
}

interface Outputs {
  onClick: (src: string | undefined) => void,
  onLoad?: (src: string) => void,
  onError?: (src: string) => void
}

@ComponentV2
export default struct Mybricks_Image {
  @Param data: Data = new Data({});
  @Param styles: Record<string, CSSProperties> = {}
  @Param inputs?: Inputs = undefined;
  @Param outputs?: Outputs = undefined;

  aboutToAppear(): void {
    this.inputs?.setSrc((src) => {
      this.data.src = src;
    })
  }

  build() {
    Column() {
      Image(this.data.svgPolyfill || this.data.src)
        .attributeModifier(
          new ApplyStyleModifier(this.styles['.mybricks-image'])
        )
        .width('100%')
        .height('100%')
        .onFinish(() => {
          this.outputs?.onLoad?.(this.data.src || '')
        })
        .onError(() => {
          this.outputs?.onError?.('error')
        })
    }.onClick(() => {
      this.outputs?.onClick(this.data.src)
    })
    .attributeModifier(
      new ApplyRootStyleModifier(this.styles['root'])
    )
  }
}
