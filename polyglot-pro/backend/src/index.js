const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const path = require('path')
const fs = require('fs')
const config = require('./config/constants')
const sequelize = require('./config/database')

// Import models (ensures associations are loaded)
require('./models')

// Import routes
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const courseRoutes = require('./routes/courseRoutes')
const lessonRoutes = require('./routes/lessonRoutes')
const assessmentRoutes = require('./routes/assessmentRoutes')

// Import middleware
const errorHandler = require('./middleware/errorHandler')

const app = express()

// Security middleware
app.use(helmet())
app.use(cors({
  origin: config.FRONTEND_URL,
  credentials: true,
}))

// Body parser middleware
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// API Routes
const apiV1 = express.Router()

apiV1.use('/auth', authRoutes)
apiV1.use('/users', userRoutes)
apiV1.use('/courses', courseRoutes)
apiV1.use('/lessons', lessonRoutes)
apiV1.use('/assessments', assessmentRoutes)

app.use('/api', apiV1)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Error handling middleware
app.use(errorHandler)

// Database connection and server start
const PORT = config.PORT

const startServer = async () => {
  try {
    // Ensure data directory exists for SQLite
    const dataDir = path.dirname(config.DB_STORAGE)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    await sequelize.authenticate()
    console.log('Database connected successfully')
    
    await sequelize.sync()
    console.log('Database synchronized')

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
      console.log(`Environment: ${config.NODE_ENV}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()

module.exports = app
