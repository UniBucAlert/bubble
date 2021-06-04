import { createSlice } from '@reduxjs/toolkit'

export type ChatState = {
  friend: number | null
}

const initialState: ChatState = {
  friend: null,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveChat: (state, action) => {
      state.friend = action.payload
    },
  },
})

export const chat = chatSlice.reducer
export const { setActiveChat } = chatSlice.actions
