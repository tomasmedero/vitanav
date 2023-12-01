import { createSlice } from '@reduxjs/toolkit'

export const hospitalSlice = createSlice({
  name: 'hospital',
  initialState: {
    isSaving: false,
    hospitals: [],
    active: null,
  },
  reducers: {
    savingNewHospital: (state) => {
      state.isSaving = true
    },
    setHospitals: (state, action) => {
      state.hospitals = action.payload
    },
  },
})

export const { savingNewHospital, setHospitals } = hospitalSlice.actions
