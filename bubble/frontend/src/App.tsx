import React, { useEffect } from 'react'
import { useAppDispatch } from './redux'
import { setUser } from './redux/features/auth'
import { Routes } from './Routes'
import { getUser } from './utils/users'

const App = () => {
  return <Routes />
}

export default App
