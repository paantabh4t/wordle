import WordLine from './WordLine'

function WordGrid({ guesses, current, correctWord, wordLength, totalGuesses }) {
  return (
    <div className="flex flex-col items-center gap-y-1 sm:gap-y-3">
      {Array.from({ length: totalGuesses }, (_, i) => {
        const submitted = i < guesses.length
        const word = submitted ? guesses[i] : i === guesses.length ? current : ''
        return (
          <WordLine
            key={i}
            word={word}
            correctWord={correctWord}
            revealed={submitted}
            wordLength={wordLength}
          />
        )
      })}
    </div>
  )
}

export default WordGrid
