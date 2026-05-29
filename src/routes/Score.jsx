import { useLocation, useNavigate } from "react-router-dom"
import "./Lvl.css"

function Score() {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state) {
    navigate("/")
    return null
  }

  const { result } = state

  const isWin = result === "win"
  const levelReached = isWin ? null : result

  function handlePlayAgain() {
    navigate("/lvl1")
  }

  return (
    <div className="container">
      <h1 className="text-5xl font-bold text-gray-400">
        {isWin ? "🎉 You Won!" : "🥲 You Lost"}
      </h1>

      {!isWin && (
        <p className="text-xl text-gray-400">
          You made it to <strong>Level {levelReached}</strong> before running out of guesses.
        </p>
      )}

      <button className="button" onClick={handlePlayAgain}>
        Play Again
      </button>
    </div>
  )
}

export default Score