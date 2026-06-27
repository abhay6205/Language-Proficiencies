import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiUsers, FiBookOpen, FiAward } from 'react-icons/fi'
import { courseService } from '../services'

function Home() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getAllCourses({ limit: 6 })
        setCourses(data.courses || data || [])
      } catch (error) {
        console.error('Failed to fetch courses:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  const stats = [
    { icon: FiUsers, label: 'Active Learners', value: '50K+' },
    { icon: FiBookOpen, label: 'Courses Available', value: '100+' },
    { icon: FiAward, label: 'Certificates Awarded', value: '10K+' },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-secondary to-accent min-h-screen flex items-center justify-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Master Any Language with AI
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Learn from interactive lessons, practice with AI tutors, and earn certificates
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/courses"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 flex items-center gap-2"
            >
              Explore Courses <FiArrowRight />
            </Link>
            <Link
              to="/register"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary"
            >
              Get Started
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map(({ icon: Icon, label, value }, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="text-center"
              >
                <Icon className="text-4xl text-primary mx-auto mb-4" />
                <p className="text-gray-600 mb-2">{label}</p>
                <p className="text-3xl font-bold text-primary">{value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Courses</h2>
          
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, idx) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
                >
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <span className="text-primary text-sm font-semibold">
                      {course.language}
                    </span>
                    <h3 className="text-xl font-bold mt-2 mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-primary">
                        ${course.price}
                      </span>
                      <Link
                        to={`/courses/${course.id}`}
                        className="text-primary hover:text-secondary font-semibold"
                      >
                        View →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Why Choose Polyglot Pro?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: 'Interactive Learning',
                desc: 'AI-powered lessons adapt to your learning pace',
              },
              {
                title: 'Expert Instructors',
                desc: 'Learn from native speakers and language experts',
              },
              {
                title: 'Flexible Schedule',
                desc: 'Learn whenever and wherever you want',
              },
              {
                title: 'Certifications',
                desc: 'Earn recognized certificates upon completion',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-lg text-center"
              >
                <h3 className="text-xl font-bold mb-3 text-primary">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
