const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Lesson = sequelize.define('Lesson', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  courseId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'courses',
      key: 'id',
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  content: {
    type: DataTypes.JSON, // Changed from JSONB for SQLite compatibility
    defaultValue: {},
  },
  videoUrl: {
    type: DataTypes.STRING,
  },
  duration: {
    type: DataTypes.INTEGER, // in minutes
    defaultValue: 0,
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    defaultValue: 'video',
  },
  resources: {
    type: DataTypes.JSON, // Changed from ARRAY(JSONB) for SQLite compatibility
    defaultValue: [],
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  timestamps: true,
  tableName: 'lessons',
})

module.exports = Lesson
