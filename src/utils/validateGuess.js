import { wordLists } from "../data/wordLists"
import guesses5 from "../data/guesses/5.js"
import guesses6 from "../data/guesses/6.js"
import guesses7 from "../data/guesses/7.js"
import guesses8 from "../data/guesses/8.js"
import guesses9 from "../data/guesses/9.js"

// Each guess file is one long string of words separated by spaces
const allowedGuesses = {
  5: guesses5.split(" "),
  6: guesses6.split(" "),
  7: guesses7.split(" "),
  8: guesses8.split(" "),
  9: guesses9.split(" "),
}

export function isValidGuess(word, length) {
  return allowedGuesses[length].includes(word) || wordLists[length].includes(word)
}
