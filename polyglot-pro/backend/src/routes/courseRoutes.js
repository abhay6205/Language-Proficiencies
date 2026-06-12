const express = require('express')
const { authMiddleware, instructorMiddleware } = require('../middleware/authMiddleware')
const { Course, Lesson, Enrollment } = require('../models')
const { Op } = require('sequelize')

const router = express.Router()

// Get all courses (with filters)
router.get('/', async (req, res) => {
  try {
    const { language, level, search, page = 1, limit = 10 } = req.query

    const where = { isPublished: true }
    if (language) where.language = language
    if (level) where.level = level
    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ]
    }

    const courses = await Course.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
      order: [['createdAt', 'DESC']],
    })

    res.json({
      courses: courses.rows,
      pagination: {
        total: courses.count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(courses.count / parseInt(limit)),
      },
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: [
        {
          model: Lesson,
          as: 'lessons',
          attributes: ['id', 'title', 'duration', 'order', 'type'],
        },
      ],
    })

    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }

    res.json(course)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get course lessons
router.get('/:id/lessons', async (req, res) => {
  try {
    const lessons = await Lesson.findAll({
      where: { courseId: req.params.id },
      order: [['order', 'ASC']],
    })

    res.json(lessons)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Enroll in course
router.post('/:id/enroll', authMiddleware, async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id)
    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }

    // Check if already enrolled
    const existing = await Enrollment.findOne({
      where: { userId: req.user.id, courseId: req.params.id },
    })

    if (existing) {
      return res.status(400).json({ message: 'Already enrolled in this course' })
    }

    const enrollment = await Enrollment.create({
      userId: req.user.id,
      courseId: req.params.id,
      status: 'enrolled',
    })

    await course.increment('enrollmentCount')

    res.status(201).json({
      message: 'Enrolled successfully',
      enrollment,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create course (instructor only)
router.post('/', [authMiddleware, instructorMiddleware], async (req, res) => {
  try {
    const { title, description, language, level, price, thumbnail, category, tags } = req.body

    const course = await Course.create({
      title,
      description,
      language,
      level,
      price,
      thumbnail,
      category,
      tags,
      instructorId: req.user.id,
    })

    res.status(201).json({
      message: 'Course created successfully',
      course,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update course
router.put('/:id', [authMiddleware, instructorMiddleware], async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id)
    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }

    if (course.instructorId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this course' })
    }

    await course.update(req.body)

    res.json({
      message: 'Course updated successfully',
      course,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
