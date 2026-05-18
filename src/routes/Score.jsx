import { useLocation, useNavigate, Navigate } from "react-router-dom"

function Score() {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state) {
    navigate("/")
    return null
  }

  const { result } = state

  function handlePlayAgain (){
    navigate("/")
  }

  return (
    <>
      <div>
        <h1 className="text-5xl font-bold">
          {result === "win" ? "🎉 You Won!" : "🥲 You Lost"}
        </h1>
      </div>
      <div>
        <button className="m-4 p-4 border-white hover:bg-gray-700 text-2xl font-semibold"
        onClick={handlePlayAgain}>Play Again</button>
      </div>
    </>  
  )
}

export default Score