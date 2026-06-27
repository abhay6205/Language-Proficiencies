import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  profile: null,
  progress: null,
  isLoading: false,
  error: null,
  enrolledCourses: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setProfile: (state, action) => {
      state.profile = action.payload
    },
    setProgress: (state, action) => {
      state.progress = action.payload
    },
    setEnrolledCourses: (state, action) => {
      state.enrolledCourses = action.payload
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload }
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const {
  setLoading,
  setProfile,
  setProgress,
  setEnrolledCourses,
  updateProfile,
  setError,
} = userSlice.actions

export default userSlice.reducer
