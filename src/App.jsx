import './App.css'
import Home from './Home'
import Score from './routes/Score'
import Lvl1 from './routes/Lvl1'
import Lvl2 from './routes/Lvl2'
import Lvl3 from './routes/Lvl3'
import Lvl4 from './routes/Lvl4'
import Lvl5 from './routes/Lvl5'
import { Route, Routes } from 'react-router-dom'

function App() {

  return ( 
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/score' element={<Score/>} />
        <Route path='/lvl1' element={<Lvl1/>} />
        <Route path='/lvl2' element={<Lvl2/>} />
        <Route path='/lvl3' element={<Lvl3/>} />
        <Route path='/lvl4' element={<Lvl4/>} />
        <Route path='/lvl5' element={<Lvl5/>} />
      </Routes>
  )
}

export default App
