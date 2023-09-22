import { FormItems } from './types'

export const getFormItem = (formItems: FormItems[], com) => {
  const item = (formItems ?? []).find((item) => {
    if (item.comName) {
      return item.comName === com.name
    }

    return item.id === com.id
  });

  return item
}

export const findFormItemIndex = (formItems: FormItems[], com) => {
  const index = formItems.findIndex((item) => {
    if (item.comName) {
      return item.comName === com.name
    }

    return item.id === com.id
  });

  return index
}