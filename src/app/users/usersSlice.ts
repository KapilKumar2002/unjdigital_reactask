// features/users/usersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../types/user'
import { fetchUsers } from './usersThunk'
const STORAGE_KEY = 'cached_users'

const loadFromStorage = (): User[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

const saveToStorage = (users: User[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}



interface UsersState {
  cachedUsers: User[]
  page: number
  hasMore: boolean
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: UsersState = {
  cachedUsers: loadFromStorage(),
  page: 1,
  hasMore: true,
  status: 'idle',
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    deleteUser: (state, action: PayloadAction<number>) => {
      state.cachedUsers = state.cachedUsers.filter((u) => u.id !== action.payload)
      saveToStorage(state.cachedUsers)
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.cachedUsers.findIndex((u) => u.id === action.payload.id)
      if (index !== -1) {
        state.cachedUsers[index] = action.payload
        saveToStorage(state.cachedUsers)
      }
    },
    createUser: (state, action: PayloadAction<User>) => {
      state.cachedUsers.unshift(action.payload)
      saveToStorage(state.cachedUsers)
    },
    clearUsers: (state) => {
      state.cachedUsers = []
      state.page = 1
      state.hasMore = true
      localStorage.removeItem(STORAGE_KEY)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const newUsers = action.payload.users.filter(
          (u) => !state.cachedUsers.some((existing) => existing.id === u.id)
        )
        state.cachedUsers.push(...newUsers)
        saveToStorage(state.cachedUsers)

        state.hasMore = action.payload.hasMore
        state.page += 1
      })
     
  },
})

export const { deleteUser, updateUser, createUser, clearUsers } = usersSlice.actions
export default usersSlice.reducer
