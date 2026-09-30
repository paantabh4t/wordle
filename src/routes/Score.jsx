import { Navigate, useLocation, useNavigate } from "react-router-dom"
import "./Lvl.css"

function Score() {
  const { state } = useLocation()
  const navigate = useNavigate()

  // Opened directly (no game result) -> back to the start
  if (!state) return <Navigate to="/" replace />

  const { result, answer } = state
  const isWin = result === "win"

  return (
    <div className="game-container justify-center">
      <h1 className="text-5xl font-bold text-center text-gray-400">
        {isWin ? "🎉 You Won!" : "🥲 You Lost"}
      </h1>

      {!isWin && (
        <p className="max-w-md text-xl text-center text-gray-400">
          You made it to <strong>Level {result}</strong> before running out of guesses.
          {answer && <> The word was <strong className="uppercase">{answer}</strong>.</>}
        </p>
      )}

      <button className="button" onClick={() => navigate("/lvl1")}>
        Play Again
      </button>
    </div>
  )
}

export default Score
