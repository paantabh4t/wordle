import LetterBox from './LetterBox'
import { calculateLetterStatuses } from '../utils/calcLetterStatus'

function WordLine({ word, correctLetterObject, correctWord, revealed, wordLength = 5 }) {
  const result = calculateLetterStatuses(word, correctWord)
  const isEmpty = word.trim() === ''

  const cells = Array.from({ length: wordLength }, (_, i) => result[i] ?? { letter: '', status: null })


  return (
    <div className="flex space-x-2 m-1 gap-x-2.5">
      {cells.map(({ letter, status }, index) => (
        <LetterBox
          key={index}
          letter={letter}
          green={status === "green" && revealed && !isEmpty}
          yellow={status === "yellow" && revealed && !isEmpty}
          gray={status === "gray" && revealed && !isEmpty}
        />
      ))}
    </div>
  )
}

export default WordLine