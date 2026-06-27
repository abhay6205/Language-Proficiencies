import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { FiBookOpen, FiUsers, FiClock, FiPlay } from 'react-icons/fi'
import { courseService } from '../services'

function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector(state => state.auth)
  const [course, setCourse] = useState(null)
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseData, lessonsData] = await Promise.all([
          courseService.getCourseById(id),
          courseService.getCourseLessons(id),
        ])
        setCourse(courseData)
        setLessons(lessonsData)
      } catch (error) {
        toast.error('Failed to load course')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    setEnrolling(true)
    try {
      await courseService.enrollCourse(id)
      toast.success('Enrolled successfully!')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to enroll')
    } finally {
      setEnrolling(false)
    }
  }

  if (loading) return <div className="text-center py-12">Loading...</div>
  if (!course) return <div className="text-center py-12">Course not found</div>

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
        >
          <div className="lg:col-span-2">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <div className="mt-8">
              <span className="inline-block bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                {course.language} • {course.level}
              </span>
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-gray-600 text-lg mb-6">{course.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow">
                  <FiBookOpen className="text-2xl text-primary mb-2" />
                  <p className="text-gray-600 text-sm">Lessons</p>
                  <p className="text-2xl font-bold">{course.lessonsCount}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <FiClock className="text-2xl text-primary mb-2" />
                  <p className="text-gray-600 text-sm">Duration</p>
                  <p className="text-2xl font-bold">{course.duration} min</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <FiUsers className="text-2xl text-primary mb-2" />
                  <p className="text-gray-600 text-sm">Students</p>
                  <p className="text-2xl font-bold">{course.enrollmentCount}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-gray-600 text-sm">Rating</p>
                  <p className="text-2xl font-bold">★ {course.rating || 4.5}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enroll Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-lg p-8 sticky top-24"
            >
              <p className="text-3xl font-bold text-primary mb-2">${course.price}</p>
              <p className="text-gray-600 mb-6">One-time payment</p>

              <button
                onClick={handleEnroll}
                disabled={enrolling}
                className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-dark transition disabled:opacity-50 flex items-center justify-center gap-2 mb-4"
              >
                <FiPlay /> {enrolling ? 'Enrolling...' : 'Enroll Now'}
              </button>

              <div className="space-y-3 text-sm text-gray-600">
                <p>✓ Lifetime access</p>
                <p>✓ Certificate of completion</p>
                <p>✓ 30-day money-back guarantee</p>
                <p>✓ Support from instructors</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Lessons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold mb-6">Course Content</h2>
          <div className="space-y-3">
            {lessons.map((lesson, idx) => (
              <div
                key={lesson.id}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary transition"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{lesson.title}</h3>
                  <p className="text-sm text-gray-600">{lesson.type}</p>
                </div>
                <div className="text-gray-600 text-sm">{lesson.duration} min</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CourseDetail
