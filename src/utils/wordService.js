import { fiveletters } from "../data/fiveletters"

export function getRandomWord() {
  const word =
    fiveletters[Math.floor(Math.random() * fiveletters.length)]

  const letterObject = {}
  for (let letter of word) {
    letterObject[letter] = (letterObject[letter] || 0) + 1
  }
  console.log("Word is :",word)

  return { word, letterObject }
}

