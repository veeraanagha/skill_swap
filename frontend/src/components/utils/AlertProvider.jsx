import React, { createContext, useContext, useState } from 'react'

const AlertContext = createContext()

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({message:'', type:'warning'})

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  )
}

export const useAlert = () => {
  return useContext(AlertContext)
}