export const findItemFromItems = (array, itemId) => {
  if (array) {
    return array.find((item) => {
      return item.id === itemId
    })
  }
}

export const removeItem = (array, removableItemId) => {
  return array.filter( (item, index) => item.id !== removableItemId)
}

export const removeKeyInObject = (obj, removableItemId) => {
  delete obj[removableItemId]
  return obj
}

export const updateOrAddItem = (array, updatedItem) => {
  if (array && (array.length > 0)) {
    return array.map( (item, _) => {
      if(item.id !== updatedItem.id) {
        // This isn't the item we care about - keep it as-is
        return item
      }

      // Otherwise, this is the one we want - return an updated value
      return {
        ...item,
        ...updatedItem
      }
    })
  } else {
    return [updatedItem]
  }
}