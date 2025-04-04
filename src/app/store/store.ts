// app/store.ts
import { configureStore } from '@reduxjs/toolkit'
import usersReducer from "../users/usersSlice"
import userByIdReducer from "../userById/userByIdSlice"

export const store = configureStore({
  reducer: {
    users: usersReducer,
    userById: userByIdReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {}, // Add any extra arguments if needed
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
