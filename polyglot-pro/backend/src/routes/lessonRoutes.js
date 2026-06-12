const express = require('express')
const { authMiddleware, instructorMiddleware } = require('../middleware/authMiddleware')
const { Lesson, Assessment, Enrollment } = require('../models')

const router = express.Router()

// Get lesson
router.get('/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id, {
      include: [
        {
          model: Assessment,
          as: 'assessments',
          attributes: ['id', 'title', 'type', 'passingScore'],
        },
      ],
    })

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' })
    }

    res.json(lesson)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Complete lesson
router.post('/:id/complete', authMiddleware, async (req, res) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id)
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' })
    }

    // Find enrollment
    const enrollment = await Enrollment.findOne({
      where: { userId: req.user.id, courseId: lesson.courseId },
    })

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' })
    }

    // Mark lesson as completed
    if (!enrollment.completedLessons.includes(lesson.id)) {
      enrollment.completedLessons = [...enrollment.completedLessons, lesson.id]
      enrollment.progress = Math.round(
        (enrollment.completedLessons.length / 10) * 100 // Assuming 10 lessons per course
      )
      if (enrollment.progress >= 100) {
        enrollment.status = 'completed'
        enrollment.completedAt = new Date()
      } else {
        enrollment.status = 'in_progress'
      }
      await enrollment.save()
    }

    res.json({ message: 'Lesson marked as complete', enrollment })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create lesson (instructor)
router.post('/', [authMiddleware, instructorMiddleware], async (req, res) => {
  try {
    const { courseId, title, description, content, videoUrl, duration, order, type } = req.body

    const lesson = await Lesson.create({
      courseId,
      title,
      description,
      content,
      videoUrl,
      duration,
      order,
      type,
    })

    res.status(201).json(lesson)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
