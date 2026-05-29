import {fiveletters} from "../data/fiveletters"
import {sixletters} from "../data/sixletters"
import {sevenletters} from "../data/sevenletters"
import {eightletters} from "../data/eightletters"
import {nineletters} from "../data/nineletters"

const wordLists = {
  5: fiveletters,
  6: sixletters,
  7: sevenletters,
  8: eightletters,
  9: nineletters,
}

export function getRandomWord(length) {
  const list = wordLists[length]

  const word = list[Math.floor(Math.random() * list.length)]

  const letterObject = {}
  for (let letter of word) {
    letterObject[letter] = (letterObject[letter] || 0) + 1
  }
  console.log("Word is :", word)

  return { word, letterObject }
}
