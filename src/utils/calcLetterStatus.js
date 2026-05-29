export function calculateLetterStatuses(word, correctWord) {
  const letterCount = {}

  for (let char of correctWord) {
    letterCount[char] = (letterCount[char] || 0) + 1
  }

  const letters = word.split("")

  const result = letters.map((letter, index) => {
    if (letter === correctWord[index]) {
      letterCount[letter]--
      return { letter, status: "green" }
    }
    return { letter, status: "none" }
    })

  for (let i = 0; i < result.length; i++) {
    const { letter, status } = result[i]
    if (status === "none" && letterCount[letter] > 0) {
      result[i].status = "yellow"
      letterCount[letter]--
    }
  }

  for (let i = 0; i < result.length; i++) {
    if (result[i].status === "none") {
      result[i].status = "gray"
    }
  }

  return result
}

