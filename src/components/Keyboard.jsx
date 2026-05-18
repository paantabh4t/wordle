function Keyboard({ onKeyPress, letterStatuses }) {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK']
  ]

  const getKeyColor = (key) => {
    const normalizedKey = key.toLowerCase()
    const hasBeenUsed = letterStatuses[normalizedKey]
    
    if (hasBeenUsed) {
      return '!bg-gray-[#1a1a1a] text-[#737070]'
    }
    return '!bg-[#303030] text-white'
  }

  const handleClick = (key) => {
    if (key === 'ENTER') {
      onKeyPress('Enter')
    } else if (key === 'BACK') {
      onKeyPress('Backspace')
    } else {
      onKeyPress(key.toLowerCase())
    }
  }

  return (
    <div className="flex flex-col items-center gap-1 mt-2 mb-2">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1">
          {row.map((key) => {
            const isSpecial = key === 'ENTER' || key === 'BACK'
            return (
              <button
                key={key}
                onClick={() => handleClick(key)}
                className={`
                  keyboard-key
                  ${isSpecial ? 'px-3 text-xs' : 'w-8'} 
                  h-10 rounded font-bold uppercase
                  hover:opacity-80 transition-opacity
                  flex items-center justify-center
                  ${getKeyColor(key)}
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