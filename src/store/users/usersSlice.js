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
  },
})

export const { setUsers, setActiveUser } = usersSlice.actions
