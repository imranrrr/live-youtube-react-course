import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Welcome from './components/Welcome'
import ClassIntroduction from './components/ClassIntroduction'
import Signup from './Pages/Signup'
import Signin from './Pages/Signin'
import Home from './Pages/Home'
import Contactus from './Pages/Contactus'

export default function App() {
  const [count, setCount] = useState(0)
  const [page, setPage] = useState("signup")


  return (
    <>
      {/* <Welcome className='welcome' classNumber={1}/> */}
      <button onClick={() => setPage("signup")}>Signup</button>
      <button onClick={() => setPage("signin")}>Signin</button>
      <button onClick={() => setPage("home")}>Home</button>
      <button onClick={() => setPage("contactus")}>Contactus</button>

      {page === "signup" && <Signup />}
      {page === "signin" && <Signin />}
      {page === "home" && <Home />}
      {page === "contactus" && <Contactus />}
    </>
  )
}

