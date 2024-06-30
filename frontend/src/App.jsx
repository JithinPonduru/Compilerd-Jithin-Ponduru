import { useState } from 'react'
import CodingArea from '../components/CodingArea'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <CodingArea />
    </div>
  )
}

export default App
