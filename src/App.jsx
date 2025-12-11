import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Welcome from './components/Welcome'
import ClassIntroduction from './components/ClassIntroduction'
import Signup from './Pages/Signup'


export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Welcome className='welcome' classNumber={1}/> */}
      <Signup />
    </>
  )
}

