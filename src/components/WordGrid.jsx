import WordLine from './WordLine'

function WordGrid({ guessedWords, currentWord, correctWord, correctLetterObject, wordCount, gameOver, wordLength = 5 }) {
  return (
    <div className="flex flex-col items-center gap-y-3">
      {guessedWords.map((word, index) => {
        if (index === wordCount) {
          return (
            <WordLine
              word={currentWord}
              correctLetterObject={correctLetterObject}
              correctWord={correctWord}
              revealed={index < wordCount || gameOver}
              wordLength={wordLength}
              key={index}
            />
          )
        }
        return (
          <WordLine
            word={word}
            correctWord={correctWord}
            correctLetterObject={correctLetterObject}
            revealed={true}
            wordLength={wordLength}
            key={index}
          />
        )
      })}
    </div>
  )
}

export default WordGrid