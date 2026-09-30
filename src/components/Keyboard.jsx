const ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'],
]

function Keyboard({ onKeyPress, usedLetters }) {
  function handleClick(key) {
    if (key === 'ENTER') onKeyPress('Enter')
    else if (key === 'BACK') onKeyPress('Backspace')
    else onKeyPress(key.toLowerCase())
  }

  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-3 mt-2 mb-2 w-full max-w-xl">
      {ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1 sm:gap-2 w-full justify-center">
          {row.map((key) => {
            const isSpecial = key === 'ENTER' || key === 'BACK'
            const used = usedLetters.has(key.toLowerCase())
            return (
              <button
                key={key}
                onClick={() => handleClick(key)}
                className={`
                  ${isSpecial ? 'flex-[1.6] text-xs' : 'flex-1'}
                  min-w-0 h-11 sm:h-10 rounded font-bold uppercase
                  hover:opacity-80 transition-opacity
                  flex items-center justify-center
                  ${used ? 'bg-[#1a1a1a] text-[#737070]' : 'bg-[#303030] text-white'}
                `}
              >
                {key === 'BACK' ? '⌫' : key}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Keyboard
