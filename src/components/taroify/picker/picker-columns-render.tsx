import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "../../../utils/lodash"
import * as React from "react"
import { CSSProperties, ReactNode, useContext, useMemo } from "react"
import { prefixClassname } from "../styles"
import { HAIRLINE_BORDER_UNSET_TOP_BOTTOM } from "../styles/hairline"
import { preventDefault } from "../utils/dom/event"
import { addUnitPx } from "../utils/format/unit"
import { useRendered } from "../utils/state"
import PickerColumn from "./picker-column"
import PickerContext from "./picker.context"
import { getPickerOptionKey, PickerOptionObject } from "./picker.shared"
import usePickerOptions from "./use-picker-options"
import less from "./picker.less"

export interface PickerColumnsRenderProps extends Omit<ViewProps, "children"> {
  style?: CSSProperties

  values?: any[]
  readonly?: boolean
  siblingCount: number

  children?: ReactNode;

  onChange?(option: PickerOptionObject, column: PickerOptionObject, emitChange?: boolean): void
}

function PickerColumnsRender(props: PickerColumnsRenderProps) {
  const {
    className,
    style,
    children,
    readonly,
    values,
    siblingCount,
    onChange,
    ...restProps
  } = props

  const { setColumnRefs, clearColumnRefs, optionHeight } = useContext(PickerContext)

  const columns = usePickerOptions(children)

  const visibleCount = siblingCount * 2

  const wrapHeight = useMemo(() => optionHeight * visibleCount, [visibleCount, optionHeight])

  const rootStyle = useMemo(
    () => ({
      ...style,
      height: addUnitPx(wrapHeight),
    }),
    [style, wrapHeight],
  )

  const maskStyle = useMemo<CSSProperties>(
    () => ({
      backgroundSize: `100% ${addUnitPx((wrapHeight - optionHeight) / 2)}`,
    }),
    [wrapHeight, optionHeight],
  )

  const frameStyle = useMemo<CSSProperties>(
    () => ({
      height: addUnitPx(optionHeight),
    }),
    [optionHeight],
  )

  const columnsRender = useRendered(() =>
    _.map(columns, (column, columnIndex) => {
      const { children: options, ...restColumnProps } = column
      // When rerender, clear columns refs
      // Prevent leakage and contamination
      clearColumnRefs?.()
      //
      return (
        <PickerColumn
          ref={setColumnRefs?.(columnIndex)}
          key={getPickerOptionKey(column) ?? columnIndex}
          // @ts-ignore
          children={options}
          readonly={readonly}
          {...restColumnProps}
          visibleCount={visibleCount}
          optionHeight={optionHeight}
          value={_.get(values, columnIndex)}
          onChange={(option, emitChange) =>
            onChange?.(
              option,
              {
                ...column,
                index: columnIndex,
              },
              emitChange,
            )
          }
        />
      )
    }),
  )

  if(children.length != 0){
    return (
      <View
        className={classNames(less.taroify_picker__columns, className)}
        style={rootStyle}
        catchMove
        onTouchMove={preventDefault}
        {...restProps}
      >
        {columnsRender}
        <View className={less.taroify_picker__mask} style={maskStyle} />
        <View
          className={classNames([HAIRLINE_BORDER_UNSET_TOP_BOTTOM, less.taroify_picker__frame])}
          style={frameStyle}
        />
      </View>
    )
  }


}

export default PickerColumnsRender
