// Returns one status per letter: "green", "yellow" or "gray"
export function calculateLetterStatuses(word, correctWord) {
  const statuses = []
  const unusedLetters = [] // letters of the answer not matched by a green

  // Pass 1: find greens
  for (let i = 0; i < word.length; i++) {
    if (word[i] === correctWord[i]) {
      statuses[i] = "green"
    } else {
      unusedLetters.push(correctWord[i])
    }
  }

  // Pass 2: everything else is yellow (if the letter is still unused) or gray
  for (let i = 0; i < word.length; i++) {
    if (statuses[i] === "green") continue

    const index = unusedLetters.indexOf(word[i])
    if (index !== -1) {
      statuses[i] = "yellow"
      unusedLetters.splice(index, 1) // each answer letter can only be used once
    } else {
      statuses[i] = "gray"
    }
  }

  return statuses
}
