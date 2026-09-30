import LetterBox from './LetterBox'
import { calculateLetterStatuses } from '../utils/calcLetterStatus'

function WordLine({ word, correctWord, revealed, wordLength }) {
  const statuses = revealed ? calculateLetterStatuses(word, correctWord) : []

  return (
    <div className="flex gap-1 sm:gap-2.5">
      {Array.from({ length: wordLength }, (_, i) => (
        <LetterBox
          key={i}
          letter={word[i] ?? ''}
          status={statuses[i]}
        />
      ))}
    </div>
  )
}

export default WordLine
