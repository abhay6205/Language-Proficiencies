const express = require('express')
const { authMiddleware } = require('../middleware/authMiddleware')
const { User, Enrollment, Course } = require('../models')

const router = express.Router()

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Course,
          as: 'courses',
          attributes: ['id', 'title', 'description'],
        },
      ],
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, bio, avatar, targetLanguages, proficiencyLevel } = req.body

    const user = await User.findByPk(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    await user.update({
      name: name || user.name,
      bio: bio || user.bio,
      avatar: avatar || user.avatar,
      targetLanguages: targetLanguages || user.targetLanguages,
      proficiencyLevel: proficiencyLevel || user.proficiencyLevel,
    })

    res.json({ message: 'Profile updated successfully', user })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get user progress
router.get('/progress', authMiddleware, async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Course,
          as: 'course',
          attributes: ['id', 'title', 'language', 'thumbnail'],
        },
      ],
    })

    const progressData = {
      totalEnrolled: enrollments.length,
      completed: enrollments.filter(e => e.status === 'completed').length,
      inProgress: enrollments.filter(e => e.status === 'in_progress').length,
      enrollments: enrollments.map(e => ({
        courseId: e.courseId,
        courseName: e.course.title,
        language: e.course.language,
        progress: e.progress,
        status: e.status,
      })),
    }

    res.json(progressData)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get enrolled courses
router.get('/courses', authMiddleware, async (req, res) => {
  try {
    const courses = await Enrollment.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Course,
          as: 'course',
          attributes: ['id', 'title', 'description', 'language', 'thumbnail', 'price'],
        },
      ],
    })

    res.json(courses)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Change password
router.post('/change-password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    const user = await User.findByPk(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isValid = await user.comparePassword(currentPassword)
    if (!isValid) {
      return res.status(401).json({ message: 'Current password is incorrect' })
    }

    user.password = newPassword
    await user.save()

    res.json({ message: 'Password changed successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
