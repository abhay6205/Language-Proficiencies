import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { lessonService } from '../services'

function Lesson() {
  const { id } = useParams()
  const [lesson, setLesson] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const data = await lessonService.getLesson(id)
        setLesson(data)
      } catch (error) {
        console.error('Failed to load lesson:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchLesson()
  }, [id])

  if (loading) return <div className="text-center py-12">Loading lesson...</div>
  if (!lesson) return <div className="text-center py-12">Lesson not found</div>

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
          <p className="text-gray-600 mb-6">{lesson.description}</p>

          {lesson.videoUrl && (
            <div className="mb-8">
              <iframe
                width="100%"
                height="500"
                src={lesson.videoUrl}
                title={lesson.title}
                allowFullScreen
                className="rounded-lg"
              />
            </div>
          )}

          <div className="prose max-w-none">
            {lesson.content && (
              <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
            )}
          </div>

          {lesson.assessments && lesson.assessments.length > 0 && (
            <div className="mt-8 pt-8 border-t">
              <h2 className="text-2xl font-bold mb-4">Assessments</h2>
              {lesson.assessments.map(assessment => (
                <div key={assessment.id} className="p-4 border rounded-lg mb-4">
                  <h3 className="font-semibold">{assessment.title}</h3>
                  <p className="text-gray-600 text-sm">{assessment.type}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Lesson
