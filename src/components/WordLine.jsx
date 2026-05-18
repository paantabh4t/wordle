import LetterBox from './LetterBox'
import { calculateLetterStatuses } from '../utils/wordUtils'

function WordLine({ word, correctLetterObject, correctWord, revealed }) {
  const result = calculateLetterStatuses(word, correctWord)
  const isEmpty = word.trim() === '' // Check if word is empty or just spaces

  return (
    <div className="flex space-x-2 m-1">
      {result.map(({ letter, status }, index) => (
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