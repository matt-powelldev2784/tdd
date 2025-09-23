// Given a string s, return the number of palindromic substrings in it.
// A string is a palindrome when it reads the same backward as forward.
// A substring is a contiguous sequence of characters within the string.

// Example 1: Input: s = "abc" Output: 3
// Explanation: Three palindromic strings: "a", "b", "c".

// Example 2: Input: s = "aaa" Output: 6
// Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".

/**
 * @param {string} s
 * @return {number}
 */

const countSubstrings = (s) => {
  // function to get substrings for each number of letters
  const getSubstrings = (string, numberOfLettersToTake) => {
    let currentString = string

    const substrings = []

    for (let i = 0; i < string.length; i++) {
      if (currentString.length < numberOfLettersToTake) continue

      const substring = currentString.substring(0, numberOfLettersToTake)
      substrings.push(substring)
      currentString = currentString.substring(1, string.length)
    }

    return substrings
  }

  // use getSubstrings function to get all substrings
  const allSubstrings = []
  const maxSubStringLength = s.length

  for (let i = 0; i < maxSubStringLength; i++) {
    const subStringLength = i + 1

    const subStrings = getSubstrings(s, subStringLength)

    subStrings.map((substring) => {
      allSubstrings.push(substring)
    })
  }

  // check if each substring is palindrome
  const checkPalindrome = (string) => {
    const reversedString = string.split('').reverse().join('')

    const isPalindrome = string === reversedString ? true : false
    return isPalindrome
  }

  const allPalindromes = allSubstrings.filter((string) => {
    const isPalindrome = checkPalindrome(string)
    if (isPalindrome) return isPalindrome
  })

  // count palindromes and return number of palindromes
  const numberOfPalindromes = allPalindromes.length

  console.log('allPalindromes', allPalindromes)
  console.log('numberOfPalindromes', numberOfPalindromes)

  return numberOfPalindromes
}

countSubstrings('aaa') // 6
countSubstrings('abc') // 3
countSubstrings('abccba') // 9
