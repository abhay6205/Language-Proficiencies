const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level: {
    type: DataTypes.STRING,
    defaultValue: 'beginner',
  },
  thumbnail: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'USD',
  },
  instructorId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  duration: {
    type: DataTypes.INTEGER, // in minutes
    defaultValue: 0,
  },
  lessonsCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  enrollmentCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  tags: {
    type: DataTypes.JSON, // Changed from ARRAY for SQLite compatibility
    defaultValue: [],
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  timestamps: true,
  tableName: 'courses',
})

module.exports = Course
