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
      className={`w-12 h-12  text-3xl 
      flex items-center justify-center font-bold uppercase rounded-md  ${bgColor}`}
    >
      {letter}
    </div>
  )
}

export default LetterBox
