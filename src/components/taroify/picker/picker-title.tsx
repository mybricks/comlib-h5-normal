import { View } from "@tarojs/components"
import * as React from "react"
import { ReactNode } from "react"
import less from "./picker.less"

interface PickerTitleProps {
  className?: string
  children?: ReactNode
}

export default function PickerTitle(props: PickerTitleProps) {
  const { children } = props
  return <View className={less.taroify_picker__title} children={children} />
}
