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
  filteredUsers: User[]
  searchQuery: string
  page: number
  hasMore: boolean
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: UsersState = {
  cachedUsers: loadFromStorage(),
  filteredUsers: loadFromStorage(),
  searchQuery: '',
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
      state.filteredUsers = state.filteredUsers.filter((u) => u.id !== action.payload)
      saveToStorage(state.cachedUsers)
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.cachedUsers.findIndex((u) => u.id === action.payload.id)
      if (index !== -1) {
        state.cachedUsers[index] = action.payload
        saveToStorage(state.cachedUsers)
      }

      // Update filteredUsers too
      const fIndex = state.filteredUsers.findIndex((u) => u.id === action.payload.id)
      if (fIndex !== -1) {
        state.filteredUsers[fIndex] = action.payload
      }
    },
    createUser: (state, action: PayloadAction<User>) => {
      state.cachedUsers.unshift(action.payload)

      // Match against search query
      if (
        action.payload.name.toLowerCase().includes(state.searchQuery) ||
        action.payload.email.toLowerCase().includes(state.searchQuery)
      ) {
        state.filteredUsers.unshift(action.payload)
      }

      saveToStorage(state.cachedUsers)
    },
    clearUsers: (state) => {
      state.cachedUsers = []
      state.filteredUsers = []
      state.page = 1
      state.hasMore = true
      state.searchQuery = ''
      localStorage.removeItem(STORAGE_KEY)
    },
    searchUsers: (state, action: PayloadAction<string>) => {
      const query = action.payload.toLowerCase()
      state.searchQuery = query
      state.filteredUsers = state.cachedUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      )
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

        // Re-filter with current search query
        state.filteredUsers = state.cachedUsers.filter(
          (user) =>
            user.name.toLowerCase().includes(state.searchQuery) ||
            user.email.toLowerCase().includes(state.searchQuery)
        )

        state.hasMore = action.payload.hasMore
        state.page += 1
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const { deleteUser, updateUser, createUser, clearUsers, searchUsers } = usersSlice.actions
export default usersSlice.reducer
