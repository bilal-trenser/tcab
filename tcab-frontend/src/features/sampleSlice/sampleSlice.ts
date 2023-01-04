/* eslint-disable import/no-cycle */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../app/store'
import getSampleResponse from '../../services/apiSample/apiSample'
import { IntialState } from './interface'

const initialState: IntialState = {
  data: null,
  status: 'idle',
}

export const fetchSampleData = createAsyncThunk(
  'sampleSlice/fetchSampleData',
  async (args, { rejectWithValue }) => {
    try {
      const response = await getSampleResponse()
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

const sampleSlice = createSlice({
  name: 'sampleSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSampleData.pending, (state) => {
        const prevState = state
        prevState.status = 'loading'
      })
      .addCase(fetchSampleData.rejected, (state) => {
        const prevState = state
        prevState.status = 'failed'
      })
      .addCase(fetchSampleData.fulfilled, (state, action) => {
        const prevState = state
        prevState.data = action.payload
        prevState.status = 'idle'
      })
  },
})

export const sampleAPIData = (state: RootState) => state.sampleData

export default sampleSlice.reducer
