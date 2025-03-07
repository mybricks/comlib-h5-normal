import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "../../../utils/lodash"
import * as React from "react"
import { Children, cloneElement, isValidElement, ReactElement, ReactNode, useMemo } from "react"
import PickerButton, { PickerButtonProps, PickerButtonType } from "./picker-button"
import PickerTitle from "./picker-title"
import less from "./picker.less"

interface PickerToolbarChildren {
  title: ReactNode
  cancel: ReactNode
  confirm: ReactNode
}

function usePickerToolbarChildren(children?: ReactNode): PickerToolbarChildren {
  return useMemo(() => {
    const __children__: PickerToolbarChildren = {
      title: undefined,
      cancel: undefined,
      confirm: undefined,
    }

    Children.forEach(children, (child: ReactNode, index) => {
      if (isValidElement(child)) {
        const element = child as ReactElement
        const { type: elementType } = element
        if (elementType === PickerTitle) {
          __children__.title = element
        } else if (elementType === PickerButton) {
          const { props } = element
          const { type } = props as PickerButtonProps
          if (type === PickerButtonType.Cancel) {
            __children__.cancel = element
          } else if (type === PickerButtonType.Confirm) {
            __children__.confirm = element
          } else if (_.isEmpty(type) && _.isEmpty(__children__.cancel)) {
            __children__.cancel = cloneElement(element, {
              type: PickerButtonType.Cancel,
            })
          } else if (_.isEmpty(type) && _.isEmpty(__children__.confirm)) {
            __children__.confirm = cloneElement(element, {
              type: PickerButtonType.Confirm,
            })
          }
        }
      }
    })
    return __children__
  }, [children])
}

interface PickerToolbarProps extends ViewProps {
  position?: "bottom"
  children?: ReactNode
}

export default function PickerToolbar(props: PickerToolbarProps) {
  const { className, children: childrenProp, ...restProps } = props
  const { title, cancel, confirm } = usePickerToolbarChildren(childrenProp)

  return (
    <View className={classNames(less.taroify_picker__toolbar, className)} {...restProps}>
      {cancel}
      {title}
      {confirm}
    </View>
  )
}
