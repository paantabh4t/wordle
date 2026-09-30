// Returns one status per letter: "green", "yellow" or "gray"
export function calculateLetterStatuses(word, correctWord) {
  const letterCount = {}

  for (const char of correctWord) {
    letterCount[char] = (letterCount[char] || 0) + 1
  }

  // Greens first, so they claim their letters before any yellows
  const statuses = [...word].map((letter, index) => {
    if (letter === correctWord[index]) {
      letterCount[letter]--
      return "green"
    }
    return null
  })

  return statuses.map((status, index) => {
    if (status) return status
    const letter = word[index]
    if (letterCount[letter] > 0) {
      letterCount[letter]--
      return "yellow"
    }
    return "gray"
  })
}
