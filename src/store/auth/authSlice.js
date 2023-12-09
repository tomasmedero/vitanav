import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking',
    role: null,
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = 'autenticated'
      state.uid = payload.uid
      state.role = payload.role
      state.email = payload.email
      state.displayName = payload.displayName
      state.photoURL = payload.photoURL
      state.errorMessage = null
    },
    logout: (state, { payload }) => {
      state.status = 'no-autenticated'
      state.role = 'noUser'
      state.uid = null
      state.email = null
      state.displayName = null
      state.photoURL = null
      state.errorMessage = payload?.errorMessage
    },
    checkingCredentials: (state) => {
      state.status = 'checking'
    },
    resetErrorMsg: (state) => {
      state.errorMessage = null
    },
  },
})

export const { login, logout, checkingCredentials, resetErrorMsg } =
  authSlice.actions
