// features/userById/userByIdSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { User } from '../../types/user'

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

// Async thunk to fetch user by ID (simulated API call)
export const fetchUserById = createAsyncThunk(
  'userById/fetchUserById',
  async (id: number, { rejectWithValue }) => {
    try {
      // Fetch all users from localStorage
      const cachedUsers = localStorage.getItem('cached_users')

      if (!cachedUsers) {
        throw new Error('No cached users found in localStorage')
      }

      const users: User[] = JSON.parse(cachedUsers)
      const userFromCache = users.find((user) => user.id === id)

      if (!userFromCache) {
        throw new Error('User not found in cached data')
      }

      // Return user data from localStorage
      return userFromCache
    } catch (err) {
      return rejectWithValue('Failed to fetch user details')
    }
  }
)

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
        state.user = action.payload // set user from cached data
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearUser } = userByIdSlice.actions
export default userByIdSlice.reducer
