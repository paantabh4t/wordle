import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRandomWord } from './utils/wordService'
import WordGrid from './components/WordGrid'
import Keyboard from './components/Keyboard'
import { isValidGuess } from './utils/validateGuess'
import "./Home.css"

const WORD_LEN = 5
const TOTAL_GUESSES = 6

function Home() {
  const [guessedWords, setGuessedWords] = useState(new Array(TOTAL_GUESSES).fill("     "))
  const [correctWord, setCorrectWord] = useState("")
  const [wordCount, setWordCount] = useState(0)
  const [letterCount, setLetterCount] = useState(0)
  const [currentWord, setCurrentWord] = useState("     ")
  const [correctLetterObject, setCorrectLetterObject] = useState({})
  const [gameOver, setGameOver] = useState(false)
  const [letterStatuses, setLetterStatuses] = useState({})

  const hasFetched = useRef(false)
  const navigate = useNavigate()

  async function initializeGame() {
    const { word, letterObject } = await getRandomWord()
    setCorrectWord(word)
    setCorrectLetterObject(letterObject)
  }

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true
    initializeGame()
  }, [])

  // Update letter statuses after each guess
  useEffect(() => {
    const newStatuses = { ...letterStatuses }

    guessedWords.forEach((word, index) => {
      if (index < wordCount && word.trim() !== '') {
        const letters = word.split('')
        
        // Mark all letters as used
        letters.forEach((letter) => {
          if (letter !== ' ') {
            const lowerLetter = letter.toLowerCase()
            newStatuses[lowerLetter] = true
          }
        })
      }
    })

    setLetterStatuses(newStatuses)
  }, [wordCount, guessedWords])

  
  function handleEnter() {
    if (currentWord === correctWord) {
      setGameOver(true)
      navigate("/score", { state: { result: "win" } })
      return
    }

    if (currentWord !== correctWord && wordCount === TOTAL_GUESSES - 1) {
      setGameOver(true)
      navigate("/score", { state: { result: "lose" } })
      return
    }

    if (letterCount !== WORD_LEN) {
      alert("words must be 5 letters")
      return
    }

    if (!isValidGuess(currentWord)) {
      alert("Not a valid word")
      return
    }

    setGuessedWords((current) => {
      const updatedGuessedWords = [...current]
      updatedGuessedWords[wordCount] = currentWord
      return updatedGuessedWords
    })

    setWordCount((current) => current + 1)
    setLetterCount(0)
    setCurrentWord("     ")
  }

  function handleBackspace() {
    if (letterCount === 0) return

    setCurrentWord((currentWord) => {
      const currentWordArray = currentWord.split("")
      currentWordArray[letterCount - 1] = " "
      return currentWordArray.join("")
    })

    setLetterCount(letterCount => letterCount - 1)
  }

  function handleAlphabetical(key) {
    if (letterCount === WORD_LEN) return

    setCurrentWord((currentWord) => {
      const currentWordArray = currentWord.split("")
      currentWordArray[letterCount] = key
      return currentWordArray.join("")
    })

    setLetterCount(letterCount => letterCount + 1)
  }

  function handleKeyPress(key) {
    if (gameOver) return

    if (key === "Enter") {
      handleEnter()
    } else if (key === "Backspace") {
      handleBackspace()
    } else if (/^[a-zA-Z]$/.test(key)) {
      handleAlphabetical(key.toLowerCase())
    }
  }

  useEffect(() => {
    function handleKeyDown(e) {
      handleKeyPress(e.key)
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => { document.removeEventListener('keydown', handleKeyDown) }
  }, [handleKeyPress])

  function resetGame() {
    setGuessedWords(new Array(TOTAL_GUESSES).fill("     "))
    initializeGame()
    setWordCount(0)
    setLetterCount(0)
    setCurrentWord("     ")
    setGameOver(false)
    setLetterStatuses({})
  }

  return (
    <div>
      <span className="text-4xl text-white font-extrabold">WORDLE!</span>
      <WordGrid
        guessedWords={guessedWords}
        currentWord={currentWord}
        correctWord={correctWord}
        correctLetterObject={correctLetterObject}
        wordCount={wordCount}
        gameOver={gameOver}
      />
      <Keyboard 
        onKeyPress={handleKeyPress}
        letterStatuses={letterStatuses}
      />
      <button
        className="mt-1 p-2 border-white hover:bg-gray-700 text-lg font-semibold"
        onClick={(e) => { resetGame(); e.target.blur() }}
      >
        Reset Game
      </button>
    </div>
  )
}

export default Home