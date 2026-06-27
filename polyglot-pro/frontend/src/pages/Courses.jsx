import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiSearch, FiFilter } from 'react-icons/fi'
import { courseService } from '../services'

function Courses() {
  const [courses, setCourses] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    language: '',
    level: '',
    search: '',
  })

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getAllCourses()
        const courseList = data.courses || data || []
        setCourses(courseList)
        setFiltered(courseList)
      } catch (error) {
        console.error('Failed to fetch courses:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  useEffect(() => {
    let result = courses

    if (filters.language) {
      result = result.filter(c => c.language === filters.language)
    }
    if (filters.level) {
      result = result.filter(c => c.level === filters.level)
    }
    if (filters.search) {
      result = result.filter(c =>
        c.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        c.description.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    setFiltered(result)
  }, [filters, courses])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Explore Courses</h1>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Search</label>
              <div className="relative">
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Language</label>
              <select
                value={filters.language}
                onChange={(e) => setFilters({ ...filters, language: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Languages</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Japanese">Japanese</option>
                <option value="Mandarin">Mandarin</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Level</label>
              <select
                value={filters.level}
                onChange={(e) => setFilters({ ...filters, level: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">&nbsp;</label>
              <button
                onClick={() => setFilters({ language: '', level: '', search: '' })}
                className="w-full bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </motion.div>

        {/* Courses Grid */}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {course.language}
                    </span>
                    <span className="text-yellow-400 font-semibold">★ {course.rating || 4.5}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-500 text-sm">{course.enrollmentCount} students</span>
                    <span className="text-gray-500 text-sm">{course.lessonsCount} lessons</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">${course.price}</span>
                    <Link
                      to={`/courses/${course.id}`}
                      className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No courses found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Courses
