import { useState, useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRandomWord } from '../utils/randomWord'
import { isValidGuess, loadGuesses } from '../utils/validateGuess'
import WordGrid from '../components/WordGrid'
import Keyboard from '../components/Keyboard'
import { WORD_LENGTHS, TOTAL_GUESSES } from '../levels'
import "./Lvl.css"

const END_DELAY_MS = 1200 // pause so the final row can be seen before moving on

function Level({ level }) {
  const wordLength = WORD_LENGTHS[level - 1]
  const navigate = useNavigate()

  const [answer, setAnswer] = useState(() => getRandomWord(wordLength))
  const [guesses, setGuesses] = useState([])
  const [current, setCurrent] = useState("")
  const [gameOver, setGameOver] = useState(false)
  const [message, setMessage] = useState("")

  const endTimer = useRef(null)
  const messageTimer = useRef(null)

  // Every letter that has appeared in a submitted guess (keys go dark)
  const usedLetters = useMemo(() => new Set(guesses.join("")), [guesses])

  // Only reveal the answer in the console during development
  useEffect(() => {
    if (import.meta.env.DEV) console.log("Word is:", answer)
  }, [answer])

  useEffect(() => {
    loadGuesses(wordLength).catch(() => {}) // falls back to the answer list
  }, [wordLength])

  useEffect(() => () => {
    clearTimeout(endTimer.current)
    clearTimeout(messageTimer.current)
  }, [])

  function showMessage(text, ms = 1500) {
    clearTimeout(messageTimer.current)
    setMessage(text)
    messageTimer.current = setTimeout(() => setMessage(""), ms)
  }

  function handleEnter() {
    if (current.length !== wordLength) {
      showMessage(`Words must be ${wordLength} letters`)
      return
    }
    if (!isValidGuess(current, wordLength)) {
      showMessage("Not a valid word")
      return
    }

    const nextGuesses = [...guesses, current]
    setGuesses(nextGuesses)
    setCurrent("")

    const won = current === answer
    const lost = !won && nextGuesses.length === TOTAL_GUESSES
    if (!won && !lost) return

    setGameOver(true)
    if (lost) showMessage(`The word was ${answer.toUpperCase()}`, END_DELAY_MS)

    endTimer.current = setTimeout(() => {
      if (lost) {
        navigate("/score", { state: { result: level, answer } })
      } else if (level < WORD_LENGTHS.length) {
        navigate(`/lvl${level + 1}`)
      } else {
        navigate("/score", { state: { result: "win" } })
      }
    }, END_DELAY_MS)
  }

  function handleKeyPress(key) {
    if (gameOver) return

    if (key === "Enter") {
      handleEnter()
    } else if (key === "Backspace") {
      setCurrent((c) => c.slice(0, -1))
    } else if (/^[a-zA-Z]$/.test(key)) {
      setCurrent((c) => (c.length < wordLength ? c + key.toLowerCase() : c))
    }
  }

  // No dependency array: re-subscribe each render so the handler is never stale
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return // don't hijack shortcuts
      handleKeyPress(e.key)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  })

  function resetGame() {
    clearTimeout(endTimer.current)
    setAnswer(getRandomWord(wordLength))
    setGuesses([])
    setCurrent("")
    setGameOver(false)
    setMessage("")
  }

  return (
    <div className="game-container">
      <span className="title">WORDLE!</span>
      <div className="h-7 text-center text-white font-semibold" aria-live="polite">{message}</div>
      <WordGrid
        guesses={guesses}
        current={current}
        correctWord={answer}
        wordLength={wordLength}
        totalGuesses={TOTAL_GUESSES}
      />
      <Keyboard onKeyPress={handleKeyPress} usedLetters={usedLetters} />
      <div className="button-container">
        {/* blur() so a later physical Enter doesn't re-activate the button */}
        <button className="button" onClick={(e) => { resetGame(); e.currentTarget.blur() }}>
          Reset Game
        </button>
        <button className="button" onClick={(e) => { navigate("/"); e.currentTarget.blur() }}>
          Home
        </button>
      </div>
    </div>
  )
}

export default Level
