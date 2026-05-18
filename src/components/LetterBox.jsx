function LetterBox({ letter, green, yellow, gray }) {
  const bgColor = green
    ? "bg-green-500 text-white"
    : yellow
    ? "bg-yellow-500 text-white"
    : gray
    ? "bg-gray-500 text-white"
    : "bg-white text-black"

  return (
    <div
      className={`w-16 h-16 border-2 border-black text-4xl 
      flex items-center justify-center font-bold uppercase ${bgColor}`}
    >
      {letter}
    </div>
  )
}

export default LetterBox
