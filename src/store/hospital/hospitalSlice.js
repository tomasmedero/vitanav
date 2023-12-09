import { createSlice } from '@reduxjs/toolkit'

export const hospitalSlice = createSlice({
  name: 'hospital',
  initialState: {
    isSaving: false,
    hospitals: [],
    active: [],
  },
  reducers: {
    savingNewHospital: (state) => {
      state.isSaving = true
    },
    setHospitals: (state, action) => {
      state.hospitals = action.payload
    },
    setHospitalsActive: (state, action) => {
      state.active = action.payload
    },
  },
})

export const { savingNewHospital, setHospitals, setHospitalsActive } =
  hospitalSlice.actions
