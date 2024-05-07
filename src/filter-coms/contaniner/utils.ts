import { FormItems } from './types'

export const getFilterItem = (filterItems: FormItems[], com) => {
  const item = (filterItems ?? []).find((item) => {
    if (item.comName) {
      return item.comName === com.name
    }

    return item.id === com.id
  });

  return item
}

export const findFilterItemIndex = (filterItems: FormItems[], com) => {
  const index = filterItems.findIndex((item) => {
    if (item.comName) {
      return item.comName === com.name
    }

    return item.id === com.id
  });

  return index
}