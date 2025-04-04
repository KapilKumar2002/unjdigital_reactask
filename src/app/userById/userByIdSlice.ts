// features/userById/userByIdSlice.ts
import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../types/user'
import { fetchUserById } from './userByIdThunk'

interface UserByIdState {
  user: User | null
  loading: boolean
  error: string | null
}

const initialState: UserByIdState = {
  user: null,
  loading: false,
  error: null,
}

// Async thunk to fetch user by ID (simulate API call)


const userByIdSlice = createSlice({
  name: 'userById',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearUser } = userByIdSlice.actions
export default userByIdSlice.reducer
