# Impossible Wordle

A Wordle variant with five levels. Word length grows each level (5 → 9 letters),
you get 6 guesses per level, and any letter you've used goes dark on the keyboard
whether or not it was in the word.

## Run it

```bash
npm install
npm run dev
```

## Structure

- `src/routes/Level.jsx` – the game, shared by all five levels (`/lvl1` … `/lvl5`)
- `src/levels.js` – word length per level and number of guesses
- `src/data/` – word lists
- `src/utils/` – letter colouring, random word, guess validation
