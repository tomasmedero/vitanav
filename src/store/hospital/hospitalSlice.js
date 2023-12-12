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
    submitCount: (state, action) => {
      return {
        ...state,
        active: state.active.map((hospital) =>
          hospital.id === action.payload.id
            ? {
                ...hospital,
                pacientesEnEspera: action.payload.pacientesEnEspera,
              }
            : hospital
        ),
        hospitals: state.hospitals.map((hospital) =>
          hospital.id === action.payload.id
            ? {
                ...hospital,
                pacientesEnEspera: action.payload.pacientesEnEspera,
              }
            : hospital
        ),
      }
    },
  },
})

export const {
  savingNewHospital,
  setHospitals,
  setHospitalsActive,
  submitCount,
} = hospitalSlice.actions
