import { ApplyRootStyleModifier, ApplyStyleModifier, ApplyFontStyleModifier, CSSProperties } from './styles/getDesignStyle'

export interface DataType {
  direction?: 'row' | 'column',
  spacing?: number
  rowKey?: string
}

type DataSourceItem = Record<string, string | number | boolean | Object> | string | number | boolean

@ObservedV2
export class Data implements DataType {
  @Trace rowKey?: string = 'id'
  @Trace spacing?: number = 0
  @Trace direction?: 'row' | 'column' = 'column'

  constructor(config: DataType) {
    if (config.rowKey !== undefined) {
      this.rowKey = config.rowKey
    }
    if (config.spacing !== undefined) {
      this.spacing = config.spacing
    }
    if (config.direction) {
      this.direction = config.direction
    }
  }
}


interface Inputs {
  addDataSource: (fn: (ds: Array<DataSourceItem>) => void) => void
  refreshDataSource: (fn: (ds: Array<DataSourceItem>) => void) => void
}

interface Outputs {
}

interface ItemParamsInputValues {
  index: number,
  itemData: DataSourceItem
}

export interface SlotsParams_item {
  id: string,
  inputValues: ItemParamsInputValues
}

export interface SlotsParams {
  item: SlotsParams_item
}
@Builder function emptySlot(params: SlotsParams_item) {}

@ComponentV2
export default struct Mybricks_Container_List {
  @Param data: Data = new Data({
    rowKey: 'id',
    spacing: 0,
    direction: 'column'
  });
  @Param styles: Record<string, CSSProperties> = {}
  @Param inputs?: Inputs = undefined;
  @Param outputs?: Outputs = undefined;
  @Local dataSource: Array<DataSourceItem> = []

  @BuilderParam slots: (slotsParams: SlotsParams_item) => void = emptySlot;

  aboutToAppear(): void {
    this.inputs?.addDataSource((ds) => {
      this.dataSource = this.dataSource.concat(ds)
    })

    this.inputs?.refreshDataSource((ds) => {
      this.dataSource = ds
    })
  }

  build() {
    Column() {
      List({ space: this.data.spacing, initialIndex: 0, }) {
        ForEach(this.dataSource, (item: DataSourceItem, index) => {
          ListItem() {
            this.slots({
              id: 'item',
              inputValues: {
                itemData: item,
                index
              }
            })
          }
        })
      }.listDirection(this.data.direction === 'row' ? Axis.Horizontal: Axis.Vertical)
    }
    .alignItems(HorizontalAlign.Start)
    .align(Alignment.Start)
    .height('100%')
    .width('100%')
    .attributeModifier(
      new ApplyRootStyleModifier(this.styles['root'])
    )
  }
}
