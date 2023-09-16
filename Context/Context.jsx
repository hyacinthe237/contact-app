"use client"

import React, { createContext, useContext, useState } from 'react'

const contactContext = createContext();
const Context = ({children}) => {
  const [update, setUpdate] = useState("");
  return (
    <contactContext.Provider value={{update, setUpdate}}>{children}</contactContext.Provider>
  )
}

export default Context

export const ContextValue = () => useContext(contactContext)