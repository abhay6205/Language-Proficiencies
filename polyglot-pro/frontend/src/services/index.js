import api from './api'

export const authService = {
  register: async (data) => {
    const response = await api.post('/auth/register', data)
    return response.data
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  logout: async () => {
    await api.post('/auth/logout')
  },

  refreshToken: async () => {
    const response = await api.post('/auth/refresh')
    return response.data
  },

  verifyEmail: async (token) => {
    const response = await api.post(`/auth/verify-email/${token}`)
    return response.data
  },

  resetPassword: async (email) => {
    const response = await api.post('/auth/reset-password', { email })
    return response.data
  },
}

export const userService = {
  getProfile: async () => {
    const response = await api.get('/users/profile')
    return response.data
  },

  updateProfile: async (data) => {
    const response = await api.put('/users/profile', data)
    return response.data
  },

  getProgress: async () => {
    const response = await api.get('/users/progress')
    return response.data
  },

  getEnrolledCourses: async () => {
    const response = await api.get('/users/courses')
    return response.data
  },

  changePassword: async (currentPassword, newPassword) => {
    const response = await api.post('/users/change-password', {
      currentPassword,
      newPassword,
    })
    return response.data
  },
}

export const courseService = {
  getAllCourses: async (params = {}) => {
    const response = await api.get('/courses', { params })
    return response.data
  },

  getCourseById: async (id) => {
    const response = await api.get(`/courses/${id}`)
    return response.data
  },

  getCourseLessons: async (courseId) => {
    const response = await api.get(`/courses/${courseId}/lessons`)
    return response.data
  },

  enrollCourse: async (courseId) => {
    const response = await api.post(`/courses/${courseId}/enroll`)
    return response.data
  },

  getRecommendedCourses: async () => {
    const response = await api.get('/courses/recommendations')
    return response.data
  },
}

export const lessonService = {
  getLesson: async (id) => {
    const response = await api.get(`/lessons/${id}`)
    return response.data
  },

  completeLesson: async (id) => {
    const response = await api.post(`/lessons/${id}/complete`)
    return response.data
  },

  submitLessonAnswer: async (lessonId, data) => {
    const response = await api.post(`/lessons/${lessonId}/submit`, data)
    return response.data
  },
}

export const assessmentService = {
  getAssessment: async (id) => {
    const response = await api.get(`/assessments/${id}`)
    return response.data
  },

  submitAssessment: async (id, answers) => {
    const response = await api.post(`/assessments/${id}/submit`, { answers })
    return response.data
  },

  getUserAssessments: async () => {
    const response = await api.get('/assessments/user')
    return response.data
  },
}

export const subscriptionService = {
  getPlans: async () => {
    const response = await api.get('/subscriptions/plans')
    return response.data
  },

  createSubscription: async (planId, paymentMethodId) => {
    const response = await api.post('/subscriptions', {
      planId,
      paymentMethodId,
    })
    return response.data
  },

  cancelSubscription: async () => {
    const response = await api.post('/subscriptions/cancel')
    return response.data
  },

  getInvoices: async () => {
    const response = await api.get('/subscriptions/invoices')
    return response.data
  },
}

export const communicationService = {
  sendMessage: async (recipientId, message) => {
    const response = await api.post('/messages', { recipientId, message })
    return response.data
  },

  getMessages: async (conversationId) => {
    const response = await api.get(`/conversations/${conversationId}`)
    return response.data
  },

  getConversations: async () => {
    const response = await api.get('/conversations')
    return response.data
  },
}

export const certificateService = {
  getCertificates: async () => {
    const response = await api.get('/certificates')
    return response.data
  },

  downloadCertificate: async (id) => {
    const response = await api.get(`/certificates/${id}/download`, {
      responseType: 'blob',
    })
    return response.data
  },
}
