const express = require('express')
const { authMiddleware } = require('../middleware/authMiddleware')
const { Assessment } = require('../models')

const router = express.Router()

// Get assessment
router.get('/:id', async (req, res) => {
  try {
    const assessment = await Assessment.findByPk(req.params.id)
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' })
    }
    res.json(assessment)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Submit assessment
router.post('/:id/submit', authMiddleware, async (req, res) => {
  try {
    const { answers } = req.body
    const assessment = await Assessment.findByPk(req.params.id)

    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' })
    }

    // Calculate score
    let score = 0
    assessment.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score += question.points || 10
      }
    })

    const totalPoints = assessment.questions.reduce((sum, q) => sum + (q.points || 10), 0)
    const percentage = Math.round((score / totalPoints) * 100)
    const passed = percentage >= assessment.passingScore

    res.json({
      score,
      totalPoints,
      percentage,
      passed,
      message: passed ? 'Assessment passed!' : 'Assessment failed. Try again!',
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
