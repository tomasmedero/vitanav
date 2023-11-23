import { createSlice } from '@reduxjs/toolkit'

export const hospitalSlice = createSlice({
  name: 'hospital',
  initialState: {
    isSaving: false,
    hospital: [],
    //active: null, Nota Chapa No sirve por ahora veremos
  },
  reducers: {
    savingNewHospital: (state) => {
      state.isSaving = true
    },
    updateHospital: (state, action) => {
      state.isSaving = false
      state.hospital = state.hospital.map((hospital) => {
        if (hospital.id === action.payload.id) {
          return action.payload
        }

        return hospital
      })
    },
  },
})

export const { savingNewHospital, updateHospital } = hospitalSlice.actions
