const COLORS = {
  green: "bg-green-500 text-white",
  yellow: "bg-yellow-500 text-white",
  gray: "bg-gray-500 text-white",
}

function LetterBox({ letter, status }) {
  const bgColor = COLORS[status] ?? "bg-white text-black"

  return (
    <div
      className={`w-8 h-8 text-xl sm:w-12 sm:h-12 sm:text-3xl
      flex items-center justify-center font-bold uppercase rounded-md ${bgColor}`}
    >
      {letter}
    </div>
  )
}

export default LetterBox
