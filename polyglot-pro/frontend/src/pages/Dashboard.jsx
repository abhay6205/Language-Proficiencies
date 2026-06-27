import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { userService } from '../services'
import { FiBook, FiTrendingUp, FiAward } from 'react-icons/fi'

function Dashboard() {
  const { user } = useSelector(state => state.auth)
  const [progress, setProgress] = useState(null)
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [progressData, coursesData] = await Promise.all([
          userService.getProgress(),
          userService.getEnrolledCourses(),
        ])
        setProgress(progressData)
        setEnrollments(coursesData)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div className="text-center py-12">Loading...</div>

  const stats = [
    {
      icon: FiBook,
      label: 'Courses Enrolled',
      value: progress?.totalEnrolled || 0,
    },
    {
      icon: FiTrendingUp,
      label: 'In Progress',
      value: progress?.inProgress || 0,
    },
    {
      icon: FiAward,
      label: 'Completed',
      value: progress?.completed || 0,
    },
  ]

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800">Welcome back, {user?.name}! 👋</h1>
          <p className="text-gray-600 mt-2">Continue your learning journey</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map(({ icon: Icon, label, value }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <Icon className="text-3xl text-primary mb-4" />
              <p className="text-gray-600 text-sm">{label}</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
            </motion.div>
          ))}
        </div>

        {/* Enrolled Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold mb-6">My Courses</h2>
          {enrollments.length > 0 ? (
            <div className="space-y-4">
              {enrollments.map((enrollment) => (
                <div
                  key={enrollment.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary transition"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">
                      {enrollment.course?.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {enrollment.course?.language} • {enrollment.status}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold text-lg text-primary">{enrollment.progress}%</p>
                      <div className="w-24 h-2 bg-gray-200 rounded-full mt-2">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${enrollment.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">No courses enrolled yet</p>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
