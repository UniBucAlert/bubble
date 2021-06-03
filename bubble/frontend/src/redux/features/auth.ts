import { createSlice } from '@reduxjs/toolkit'


export type User = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
}

export type AuthState = {
  user: User | null
}

const initialState: AuthState = {
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})

export const auth = authSlice.reducer
export const { setUser } = authSlice.actions
