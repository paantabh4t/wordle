import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRandomWord } from '../utils/randomWord'
import WordGrid from '../components/WordGrid'
import Keyboard from '../components/Keyboard'
import { isValidGuess } from '../utils/validateGuess'
import "./Lvl.css"

const WORD_LEN = 7
const TOTAL_GUESSES = 6

function Lvl3() {
  const [guessedWords, setGuessedWords] = useState(new Array(TOTAL_GUESSES).fill("     "))
  const [correctWord, setCorrectWord] = useState("")
  const [wordCount, setWordCount] = useState(0)
  const [letterCount, setLetterCount] = useState(0)
  const [currentWord, setCurrentWord] = useState("     ")
  const [correctLetterObject, setCorrectLetterObject] = useState({})
  const [gameOver, setGameOver] = useState(false)
  const [letterStatuses, setLetterStatuses] = useState({})
  const [level, setLevel] = useState(1)

  const hasFetched = useRef(false)
  const navigate = useNavigate()

  async function initializeGame() {
    const { word, letterObject } = getRandomWord(7)
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
      navigate("/lvl4", { state: { result: "win" } })
      return
    }

    if (currentWord !== correctWord && wordCount === TOTAL_GUESSES - 1) {
      setGameOver(true)
      navigate("/score", { state: { result: 3 } })
      return
    }

    if (letterCount !== WORD_LEN) {
      alert("words must be 7 letters")
      return
    }

    if (!isValidGuess(currentWord, 7)) {
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
    <div className='container'>
      <span className="title">WORDLE!</span>
      <WordGrid
        guessedWords={guessedWords}
        currentWord={currentWord}
        correctWord={correctWord}
        correctLetterObject={correctLetterObject}
        wordCount={wordCount}
        gameOver={gameOver}
        wordLength={7}
      />
      <Keyboard 
        onKeyPress={handleKeyPress}
        letterStatuses={letterStatuses}
      />
      <button
          className="button"
          onClick={() => navigate("/")}
        >
          Home
        </button>
    </div>
  )
}

export default Lvl3