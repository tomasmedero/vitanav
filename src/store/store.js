import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { hospitalSlice } from './hospital'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    hospital: hospitalSlice.reducer,
  },
})
