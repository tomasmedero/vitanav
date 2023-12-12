import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    active: {
      displayName: '',
      email: '',
      role: 'noUser',
      uid: '',
    },
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload
    },
    setActiveUser: (state, action) => {
      state.active = action.payload
    },
    cleanActiveUser: (state) => {
      state.active = {
        displayName: '',
        email: '',
        role: 'noUser',
        uid: '',
      }
    },
  },
})

export const { setUsers, setActiveUser, cleanActiveUser } = usersSlice.actions
