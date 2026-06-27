import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  courses: [],
  filteredCourses: [],
  isLoading: false,
  error: null,
  filters: {
    language: '',
    level: '',
    search: '',
  },
}

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setCourses: (state, action) => {
      state.courses = action.payload
      state.filteredCourses = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    filterCourses: (state, action) => {
      const { language, level, search } = action.payload
      state.filters = { language, level, search }

      state.filteredCourses = state.courses.filter(course => {
        const matchLanguage = !language || course.language === language
        const matchLevel = !level || course.level === level
        const matchSearch = !search || 
          course.title.toLowerCase().includes(search.toLowerCase()) ||
          course.description.toLowerCase().includes(search.toLowerCase())
        
        return matchLanguage && matchLevel && matchSearch
      })
    },
  },
})

export const { setLoading, setCourses, setError, filterCourses } = courseSlice.actions
export default courseSlice.reducer
