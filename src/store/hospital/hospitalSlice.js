import { createSlice } from '@reduxjs/toolkit'

export const hospitalSlice = createSlice({
  name: 'hospital',
  initialState: {
    isSaving: false,
    info: [],
    //active: null, Nota Chapa No sirve por ahora veremos
  },
  reducers: {
    savingNewHospital: (state) => {
      state.isSaving = true
    },
  },
})

export const { savingNewHospital } = hospitalSlice.actions
