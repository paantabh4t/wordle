import { wordLists } from "../data/wordLists"

// Full dictionaries are big, so each length is its own lazily-loaded chunk
const guessLoaders = {
  5: () => import("../data/guesses/5.js"),
  6: () => import("../data/guesses/6.js"),
  7: () => import("../data/guesses/7.js"),
  8: () => import("../data/guesses/8.js"),
  9: () => import("../data/guesses/9.js"),
}

// Build each Set once instead of on every guess
const validSets = {}

// Start with just the answers, then widen to the full dictionary once loaded
export function loadGuesses(length) {
  validSets[length] ??= new Set(wordLists[length])
  return guessLoaders[length]().then(({ default: words }) => {
    for (const word of words.split(" ")) validSets[length].add(word)
  })
}

export function isValidGuess(word, length) {
  validSets[length] ??= new Set(wordLists[length])
  return validSets[length].has(word.toLowerCase())
}
