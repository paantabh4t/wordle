import { wordLists } from "../data/wordLists"

export function getRandomWord(length) {
  const list = wordLists[length]
  return list[Math.floor(Math.random() * list.length)]
}
