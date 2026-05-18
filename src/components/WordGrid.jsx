import WordLine from './WordLine'

function WordGrid({ guessedWords, currentWord, correctWord, correctLetterObject, wordCount, gameOver }) {
    return (
    <div className="flex flex-col items-center">
      {guessedWords.map((word, index) => {
        if (index === wordCount) {
          return (
            <WordLine
              word={currentWord}
              correctLetterObject={correctLetterObject}
              correctWord={correctWord}
              revealed={index < wordCount || gameOver}
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
            key={index}
          />
        )
      })}
    </div>
  )
}

export default WordGrid