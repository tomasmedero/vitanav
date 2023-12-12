import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { hospitalSlice } from './hospital'
import { usersSlice } from './users/usersSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    hospital: hospitalSlice.reducer,
    users: usersSlice.reducer,
  },
})
