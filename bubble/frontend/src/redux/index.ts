import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { auth } from './features/auth'
import { chat } from './features/chat'

const reducer = combineReducers({
    auth,
    chat,
})

// Main App Store
export const store = configureStore({
  reducer,
})

// App state, used for typescript
export type AppState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
