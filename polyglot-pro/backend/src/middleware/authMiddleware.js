const jwt = require('jsonwebtoken')
const config = require('../config/constants')

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const decoded = jwt.verify(token, config.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

const adminMiddleware = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin role required.' })
  }
  next()
}

const instructorMiddleware = (req, res, next) => {
  if (!['instructor', 'admin'].includes(req.user?.role)) {
    return res.status(403).json({ message: 'Access denied. Instructor role required.' })
  }
  next()
}

module.exports = {
  authMiddleware,
  adminMiddleware,
  instructorMiddleware,
}
