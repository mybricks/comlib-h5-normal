import { ApplyRootStyleModifier, ApplyStyleModifier, CSSProperties } from './styles/getDesignStyle'

type PopupPosition = 'center' | 'top' | 'bottom' | 'left' | 'right'

export interface DataType {
  layout?: CSSProperties
  position: PopupPosition
  maskClose?: boolean
  visibleClose?: boolean
}


@ObservedV2
export class Data implements DataType {
  @Trace layout?: CSSProperties = {}
  @Trace position: PopupPosition = 'center'
  @Trace maskClose?: boolean
  @Trace visibleClose?: boolean

  constructor(config: DataType) {
    this.position = config.position ?? this.position;
    this.maskClose = config.maskClose ?? this.maskClose ?? false;
    this.visibleClose = config.visibleClose ?? this.visibleClose ?? false;
  }
}


interface Inputs {
}

interface Outputs {
  onClose?: (signal?: string) => void
  onClickOverlay?: (signal?: string) => void
}

interface _Env {
  currentScenes: _EnvCurrentScenes
}

interface _EnvCurrentScenes {
  close: () => void
}


export interface SlotsParams_content {
  id: string,
  style?: CSSProperties
}

export interface SlotsParams {
  item: SlotsParams_content
}
@Builder function emptySlot(params: SlotsParams_content) {}

@ComponentV2
export default struct Mybricks_Popup {
  @Param data: Data = new Data({
    position: 'center',
    maskClose: true,
    visibleClose: false
  });
  @Param styles: Record<string, CSSProperties> = {}
  @Param inputs?: Inputs = undefined;
  @Param outputs?: Outputs = undefined;
  @Param _env?: _Env = undefined

  @BuilderParam slots: (name: SlotsParams_content) => void = emptySlot;

  aboutToAppear(): void {

  }

  handleOverlayClick () {
    if (this.data.maskClose) {
      this._env?.currentScenes.close?.()
      this.outputs?.onClickOverlay?.();
    }
  }

  build() {
    Column() {
      Column() {
        Stack() {
          if (this.data.position === 'center') {
            Column() {
              Text('我是测试文本')
              this.slots({
                id: 'content'
              })
            }
            .attributeModifier(
              new ApplyStyleModifier(this.styles['.mybricks-content'])
                .backgroundColor('#ffffff')
            )
            .center()
          }
          if (this.data.position === 'bottom') {
            Column() {
              Text('我是测试文本')
              this.slots({
                id: 'content'
              })
            }
            .attributeModifier(
              new ApplyStyleModifier(this.styles['.mybricks-content'])
                .backgroundColor('#ffffff')
            )
            .bottom()
          }
          if (this.data.position === 'top') {
            Column() {
              Text('我是测试文本')
              this.slots({
                id: 'content'
              })
            }
            .attributeModifier(
              new ApplyStyleModifier(this.styles['.mybricks-content'])
                .backgroundColor('#ffffff')
            )
            .top()
          }
        }
        .height('100%')
        .width('100%')
        .alignContent(Alignment.Center)
      }
      .alignItems(HorizontalAlign.Start)
      .align(Alignment.Start)
      .height('100%')
      .width('100%')
      .attributeModifier(
        new ApplyStyleModifier(this.styles['.mybricks-overlay'])
          .backgroundColor('rgba(0,0,0,0.4)')
      )
      .transition(TransitionEffect.OPACITY
        .animation({ duration: 300, curve: Curve.Friction, delay: 0 }))
    }.attributeModifier(
      new ApplyRootStyleModifier(this.styles['root'])
    )
  }
}


@Extend(Column) function center() {
  .width('fit-content')
  .transition(TransitionEffect.scale({ x: 0.5, y: 0.5 })
    .animation({ duration: 300, curve: Curve.Friction, delay: 0 }))
}

@Extend(Column) function bottom() {
  .width('100%')
  .translate({ x: 0, y: 100 })
  // .transition(TransitionEffect.translate({ x: 0, y: 100 }))
  // .animation({ duration: 300, curve: Curve.Friction, delay: 0 })
}

@Extend(Column) function top() {
  .width('100%')
  .transition(TransitionEffect.translate({ x: 0, y: 100 }))
  .animation({ duration: 300, curve: Curve.Friction, delay: 0 })
}