import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRandomWord } from '../utils/randomWord'
import { isValidGuess } from '../utils/validateGuess'
import WordGrid from '../components/WordGrid'
import Keyboard from '../components/Keyboard'
import { WORD_LENGTHS, TOTAL_GUESSES } from '../levels'
import "./Lvl.css"

function Level({ level }) {
  const wordLength = WORD_LENGTHS[level - 1]
  const navigate = useNavigate()

  const [answer, setAnswer] = useState(() => getRandomWord(wordLength))
  const [guesses, setGuesses] = useState([])
  const [current, setCurrent] = useState("")
  const [message, setMessage] = useState("")

  // Work out win/lose from the guesses instead of storing it separately
  const won = guesses.includes(answer)
  const lost = !won && guesses.length === TOTAL_GUESSES
  const gameOver = won || lost

  // Every letter that has been guessed (these keys go dark)
  const usedLetters = new Set(guesses.join(""))

  // Show the answer in the console while developing
  useEffect(() => {
    if (import.meta.env.DEV) console.log("Word is:", answer)
  }, [answer])

  // Hide the message after 1.5 seconds
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(() => setMessage(""), 1500)
    return () => clearTimeout(timer)
  }, [message])

  // When the game ends, wait a moment so the last row can be seen, then move on
  useEffect(() => {
    if (!gameOver) return
    const timer = setTimeout(() => {
      if (lost) {
        navigate("/score", { state: { result: level, answer } })
      } else if (level < WORD_LENGTHS.length) {
        navigate(`/lvl${level + 1}`)
      } else {
        navigate("/score", { state: { result: "win" } })
      }
    }, 1200)
    return () => clearTimeout(timer) // cancelled if the game is reset
  }, [gameOver, lost, level, answer, navigate])

  function handleEnter() {
    if (current.length !== wordLength) {
      setMessage(`Words must be ${wordLength} letters`)
    } else if (!isValidGuess(current, wordLength)) {
      setMessage("Not a valid word")
    } else {
      setGuesses([...guesses, current])
      setCurrent("")
    }
  }

  function handleKeyPress(key) {
    if (gameOver) return

    if (key === "Enter") {
      handleEnter()
    } else if (key === "Backspace") {
      setCurrent(current.slice(0, -1))
    } else if (/^[a-zA-Z]$/.test(key) && current.length < wordLength) {
      setCurrent(current + key.toLowerCase())
    }
  }

  // Listen for the physical keyboard.
  // No dependency array, so it re-subscribes every render and always sees the latest state.
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return // leave shortcuts like Ctrl+R alone
      if (e.key === "Enter") e.preventDefault() // stop Enter also clicking a focused button
      handleKeyPress(e.key)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  })

  function resetGame() {
    setAnswer(getRandomWord(wordLength))
    setGuesses([])
    setCurrent("")
    setMessage("")
  }

  return (
    <div className="game-container">
      <span className="title">WORDLE!</span>
      <div className="h-7 text-center text-white font-semibold">
        {lost ? `The word was ${answer.toUpperCase()}` : message}
      </div>
      <WordGrid
        guesses={guesses}
        current={current}
        correctWord={answer}
        wordLength={wordLength}
        totalGuesses={TOTAL_GUESSES}
      />
      <Keyboard onKeyPress={handleKeyPress} usedLetters={usedLetters} />
      <div className="button-container">
        <button className="button" onClick={resetGame}>Reset Game</button>
        <button className="button" onClick={() => navigate("/")}>Home</button>
      </div>
    </div>
  )
}

export default Level
