import { expect, test } from 'vitest'

// I want to know the size of the longest consecutive elements of X in Y.
// You will receive two arguments: items and key.
// Return the length of the longest segment of consecutive keys in the given items.

//Notes:
// The items and the key will be either an integer or a string (consisting of letters only)
// If the key does not appear in the items, return 0
//Examples
//  90000, 0           -->  4
// "abcdaaadse", "a"  -->  3
// "abcdaaadse", "z"  -->  0

type GetConsecutiveItemsProps = {
  items: string | number
  key: string | number
}

const getConsecutiveItems = ({ items, key }: GetConsecutiveItemsProps) => {
  const itemsArray = items.toString().split('')

  // find all the indexes of items that match the key
  const indexOfFoundItems: number[] = []
  itemsArray.map((item, index) => {
    if (item === key.toString()) {
      indexOfFoundItems.push(index)
    }
  })

  // if no items found return 0
  if (indexOfFoundItems.length === 0) return 0

  // initialise group items and array
  const groupedItems: number[][] = []
  let currentGroupedItems: number[] = []

  indexOfFoundItems.forEach((itemIndex, index) => {
    const nextIndex = indexOfFoundItems[index + 1]

    // if the next index is not consecutive then
    // the current group of consecutive numbers is complete
    const nextIndexRequiresSplit = itemIndex !== nextIndex - 1
    currentGroupedItems.push(itemIndex)

    // push the current group of consecutive numbers results
    if (nextIndexRequiresSplit) {
      groupedItems.push(currentGroupedItems)
      currentGroupedItems = []
    }
  })

  // find the longest array of consecutive numbers
  const largestConsecutiveGroup = groupedItems.reduce((acc, groupedItems) => {
    return acc > groupedItems.length ? acc : groupedItems.length
  }, 0)

  return largestConsecutiveGroup
}

test('if no are items found return 0', () => {
  const result = getConsecutiveItems({ items: 'a', key: 'z' })
  expect(result).toBe(0)
})

test('will return a number if consecutive items are found', () => {
  const result = getConsecutiveItems({ items: 90000, key: 0 })
  expect(result).toBe(4)
})

test('will return the longest number of consecutive items if many groups of consecutive items are provided', () => {
  const result1 = getConsecutiveItems({ items: 'abcdaaadsea', key: 'a' })
  expect(result1).toBe(3)
  const result2 = getConsecutiveItems({
    items: 'abcdaaadseaaaaa56655hhhhyyaaaaaaaaaaiii',
    key: 'a',
  })
  expect(result2).toBe(10)
})
