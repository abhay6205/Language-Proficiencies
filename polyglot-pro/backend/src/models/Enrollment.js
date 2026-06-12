const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Enrollment = sequelize.define('Enrollment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  courseId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'courses',
      key: 'id',
    },
  },
  enrolledAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  progress: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // percentage
  },
  completedLessons: {
    type: DataTypes.JSON, // Changed from ARRAY(UUID) for SQLite compatibility
    defaultValue: [],
  },
  completedAt: {
    type: DataTypes.DATE,
  },
  certificateId: {
    type: DataTypes.UUID,
  },
  lastAccessedAt: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'enrolled',
  },
}, {
  timestamps: true,
  tableName: 'enrollments',
})

module.exports = Enrollment
