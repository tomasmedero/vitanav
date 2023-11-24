import { createSlice } from '@reduxjs/toolkit'

export const hospitalSlice = createSlice({
  name: 'hospital',
  initialState: {
    isSaving: false,
    hospitals: [],
    //active: null, Nota Chapa No sirve por ahora veremos
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
