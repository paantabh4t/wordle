import Home from './Home'
import Score from './routes/Score'
import Level from './routes/Level'
import { WORD_LENGTHS } from './levels'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/score' element={<Score />} />
      {WORD_LENGTHS.map((_, i) => (
        // key forces a fresh game when moving between levels
        <Route key={i} path={`/lvl${i + 1}`} element={<Level key={i} level={i + 1} />} />
      ))}
    </Routes>
  )
}

export default App
