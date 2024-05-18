import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/utils/Navbar/Navbar.jsx'
import Footer from './components/utils/Footer.jsx'
import './App.css'

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(
    localStorage.getItem('color-theme') === 'dark' || (!localStorage.getItem('color-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  )

  const bgImage = isDarkTheme ? "bg-dark-mode" : "bg-light-mode"

  return (
    <>
      <div className={`bg-sky-100 dark:bg-slate-950 min-h-screen relative flex justify-between flex-col bg-cover bg-center h-screen w-full ${bgImage}`}>
        <Navbar isDark={isDarkTheme} setIsDark={setIsDarkTheme}/>
        <Outlet />
        <Footer />
      </div>
    </>
  )
}

export default App
