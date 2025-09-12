// Write a function that returns “Fizz” for multiples of 3,
// “Buzz” for multiples of 5, “FizzBuzz” for multiples of both,
// and the number itself otherwise.

import { expect, test } from 'vitest'

const fizzBuzz = (num: number) => {
  const divisibleByThree = num % 3 === 0
  const divisibleByFive = num % 5 === 0

  if (num <= 0) return num
  if (divisibleByThree && divisibleByFive) return 'fizzbuzz'
  if (divisibleByThree) return 'fizz'
  if (divisibleByFive) return 'buzz'

  return num
}

test('it returns a number', () => {
  const result = fizzBuzz(1)
  expect(typeof result).toBe('number')
})

test('it return the number that was passed in', () => {
  const result = fizzBuzz(2)
  expect(result).toBe(2)
})

test('it returns fizz if result is a multiple of 3', () => {
  const result = fizzBuzz(3)
  expect(result).toBe('fizz')
})

test('it returns buzz if result is a multiple of 5', () => {
  const result = fizzBuzz(5)
  expect(result).toBe('buzz')
})

test('it returns fizzbuzz if result is a multiple of 3 and 5', () => {
  const result = fizzBuzz(15)
  expect(result).toBe('fizzbuzz')
})

test('it returns zero if zero is input ', () => {
  const result = fizzBuzz(0)
  expect(result).toBe(0)
})

test('it returns minus number if minus number is passed in', () => {
  const result = fizzBuzz(-1)
  expect(result).toBe(-1)
})

test('it returns minus number if minus number is passed in', () => {
  const result = fizzBuzz(-3)
  expect(result).toBe(-3)
})
