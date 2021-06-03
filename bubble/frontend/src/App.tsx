import React, { useEffect } from 'react'
import { useAppDispatch } from './redux'
import { setUser } from './redux/features/auth'
import { Routes } from './Routes'
import { getUser } from './utils/users'

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    getUser().then((data) => {
      dispatch(setUser(data))
    })
  }, [])

  return <Routes />
}

export default App
