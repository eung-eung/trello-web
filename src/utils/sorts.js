// sort columns/cards
export const mapOrder = (originalArray, orderArray, key) => {
  if (
    !originalArray ||
    !Array.isArray(originalArray) ||
    !orderArray ||
    !Array.isArray(orderArray)
  ) {
    return []
  }

  const cloneArray = [...originalArray]
  const orderedArray = cloneArray.sort((a, b) => {
    return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key])
  })

  return orderedArray
}
