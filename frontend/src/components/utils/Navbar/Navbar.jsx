import React, { useEffect, useState } from 'react';
import ThemeToggle from '../ThemeToggle';
import NavLink from './Navlink';
import { useUser } from '../UserProvider';
import { defaultUser } from '../defaultUser';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';
import Axios from 'axios'
import { useAlert } from '../AlertProvider'
import { jwtDecode } from 'jwt-decode'

Axios.defaults.withCredentials = true

const Navbar = ({ isDark, setIsDark }) => {

  const { userData, setUserData } = useUser()
  const navigate = useNavigate()
  const { alert, setAlert } = useAlert()
  const [token, setToken] = useState(null)


  useEffect(() => {
    const decodedToken = decodeToken()
    if (decodedToken) {
      setToken(decodedToken)
      console.log("decoded token : ", decodedToken)
    } else {
      console.warn('No valid token found')
      setToken(null)
    }
  }, [userData])


  const handleLogout = async () => {
    await Axios.post(`${import.meta.env.VITE_BACKEND_URL}user/logout`)
    setUserData({ ...defaultUser })
    setAlert({
      message: "User logged out.",
      type: 'success'
    })
    navigate('/user/login')
  }



  const getCookie = (name) => {
    const value = `; ${document.cookie}`
    console.log(value)
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
    return null
  }


  function decodeToken() {
    const token = getCookie('token')
    if (!token) {
      return null
    }
    try {
      const decodedToken = jwtDecode(token)
      return decodedToken
    } catch (error) {
      console.error('Invalid token:', error)
      return null
    }
  }


  return (
    <nav className="select-none border-gray-200 bg-slate-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Skill<span className="text-blue-600 dark:text-blue-500">Swap</span>.
        </h1>

        <button
          data-collapse-toggle="navbar-solid-bg"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-solid-bg"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>

        <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
          <ul className="flex flex-col items-center font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <li>
              <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
            </li>

            <li>
              {token && <Notification />}
            </li>

            <li>
              <NavLink to="/home">Home</NavLink>
            </li>

            <li>
              {token && <NavLink to="/swipe">Swipe</NavLink>}
            </li>

            <li>
              {token && <NavLink to="/user/profile">User</NavLink>}
            </li>

            <li>
              {!token ? (
                <NavLink to="/user/login">
                  Login
                </NavLink>
              ) : (
                <button onClick={handleLogout} className="text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
