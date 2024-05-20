import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/utils/Navbar/Navbar.jsx'
import Footer from './components/utils/Footer.jsx'
import './App.css'
import { UserProvider } from './components/utils/UserProvider.jsx'

export default function App() {
  
  const [isDarkTheme, setIsDarkTheme] = useState('dark')
  const bgImage = isDarkTheme ? "bg-dark-mode" : "bg-light-mode"


  return (
    <>
      <UserProvider>
        <div className={`bg-sky-100 dark:bg-slate-950 min-h-screen relative flex justify-between flex-col bg-cover bg-fixed bg-center w-full ${bgImage}`}>

          <Navbar isDark={isDarkTheme} setIsDark={setIsDarkTheme} />

          <Outlet />

          <Footer />

        </div>
      </UserProvider>
    </>
  )
}