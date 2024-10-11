import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { CSSProperties, isValidElement, ReactNode, useMemo, useContext } from "react"
import { isTextElement } from "../utils/validate"
import PickerContext from "./picker.context"
import less from "./picker-option.less"

export interface PickerOptionProps extends ViewProps {
  className?: string
  style?: CSSProperties
  value?: any
  label?: ReactNode
  disabled?: boolean
  children?: ReactNode
}

export default function PickerOption(props: PickerOptionProps) {
  const {
    className,
    disabled,
    // @ts-ignore
    index,
    value,
    label,
    children: childrenProp,
    ...restProps
  } = props
  const { optionHeight } = useContext(PickerContext)

  const children = useMemo(() => {
    if (isValidElement(childrenProp)) {
      return childrenProp
    }
    if (isTextElement(childrenProp)) {
      return <View className="ellipsis">{childrenProp}</View>
    }
    if (isValidElement(label)) {
      return label
    }
    if (isTextElement(label)) {
      return <View className="ellipsis">{label}</View>
    }
  }, [childrenProp, label])

  return (
    <View
      className={classNames(
        less.taroify_picker_option,
        {
          [less.taroify_picker_option__disabled]: disabled,
        },
        className,
      )}
      style={{
        height: `${optionHeight}px`
      }}
      children={children}
      {...restProps}
    />
  )
}
