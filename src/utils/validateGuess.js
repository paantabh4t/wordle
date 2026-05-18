import { fiveguesses } from "../data/fiveguesses"

const validSet = new Set(fiveguesses)

export function isValidGuess(word) {
  return validSet.has(word.toLowerCase())
}
