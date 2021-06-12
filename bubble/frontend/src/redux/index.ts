import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
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
export type RootState = ReturnType<typeof store.getState>
export type AppState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector