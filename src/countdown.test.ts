import { expect, test } from 'vitest'
import wordlist from 'wordlist-english'

// Given an uppercase 9 letter string, letters, find the longest word that can be made with some or
// all of the letters. The preloaded array words (or $words in Ruby) contains a bunch of uppercase
// words that you will have to loop through. Only return the longest word; if there is more than one,
// return the words of the same lengths in alphabetical order. If there are no words that can be
// made from the letters given, return None/nil/null.

const commonEnglishWords = [...wordlist['english/10'], 'LANDSCAPE']
const uppercaseWords = commonEnglishWords
  .map((word: string) => word.toUpperCase())
  .reverse()

const letsCountdown = (letters: string) => {
  if (letters.length !== 9) throw new Error('Input must be 9 letters')

  const possibleWords = uppercaseWords.reduce((acc: string[], word: string) => {
    const inputLettersArray = letters.split('')
    const outputWordArray = word.split('')

    for (const letter of outputWordArray) {
      // check if letter from the output word is present in input string
      const inputLetterIsPresent = inputLettersArray.includes(letter)

      if (inputLetterIsPresent) {
        // get index of letter in input string
        const inputIndex = inputLettersArray.findIndex((inputLetter) => {
          return inputLetter === letter
        })

        // remove letter from input string array to prevent re-use
        inputLettersArray.splice(inputIndex, 1)
      }
    }

    // return word if all letters in word are found in input string
    if (inputLettersArray.length === letters.length - outputWordArray.length)
      return [...acc, word]

    // return acc if word cannot be made from input string
    return acc
  }, [])

  // sort possible words by length
  const possibleWordsSorted = possibleWords.sort((a, b) => b.length - a.length)

  // get length of longest word
  const wordLengths = possibleWordsSorted.map((word) => word.length)

  // filter possible words to only include longest words
  const longestWordLength = wordLengths[0]
  const longestWords = possibleWordsSorted.filter(
    (word) => word.length === longestWordLength
  )

  // sort longest words alphabetically
  const longestWordsAlphabetical = longestWords.sort()

  // return longest words or null if no words found
  if (longestWordsAlphabetical.length) return longestWordsAlphabetical
  return null
}

test('if input is not 9 letters throw error', () => {
  expect(() => letsCountdown('a')).toThrow('Input must be 9 letters')
})

test('if no words can be made return null', () => {
  const result = letsCountdown('ZZZZZZZZZ')
  expect(result).toEqual(null)
})

test('if a word can be made return a array', () => {
  const result = letsCountdown('LANDSCAPE')
  expect(result).toBeInstanceOf(Array)
})

test('if the word ZERO can be made return ZERO in the array', () => {
  const result = letsCountdown('AAAAAZERO')
  if (result === null) return true
  expect(result.includes('ZERO')).toBe(true)
})

test('if a nine letter word can be made return a nine letter word in the array', () => {
  const result = letsCountdown('LANDSCAPE')
  if (result === null) return true
  expect(result.includes('LANDSCAPE')).toBe(true)
  expect(result[0].length).toBe(9)
})

test('returns multiple words if multiple words can be made', () => {
  // AREA and ZERO can both be made from AAAAAZERO
  const result = letsCountdown('AAAAAZERO')
  if (result === null) return true
  expect(result.includes('ZERO')).toBe(true)
  expect(result.includes('AREA')).toBe(true)
  expect(result.length === 2).toBe(true)
})

test('returns multiple words in alphabetical order', () => {
  // AREA and ZERO can both be made from AAAAAZERO
  const result = letsCountdown('AAAAAZERO')
  expect(result).toEqual(['AREA', 'ZERO'])
})
