import './App.css'
import Home from './Home'
import Score from './routes/Score'
import { Route, Routes } from 'react-router-dom'


function App() {

  return (
  <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/score' element={<Score/>} />
    </Routes>
            
  </>
  )
}

export default App
