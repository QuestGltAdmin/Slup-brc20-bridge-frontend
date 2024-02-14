import { useState } from 'react'
import './App.css'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Homepage } from './Pages/Homepage'
import { Privacy } from './Pages/Privacy';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/privacy-policy" element={<Privacy />} />
      </Routes>
    </BrowserRouter>

  </>
  )
}

export default App
