const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Assessment = sequelize.define('Assessment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  lessonId: {
    type: DataTypes.UUID,
    references: {
      model: 'lessons',
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
  questions: {
    type: DataTypes.JSON, // Changed from JSONB for SQLite compatibility
    defaultValue: [],
  },
  type: {
    type: DataTypes.STRING,
    defaultValue: 'quiz',
  },
  passingScore: {
    type: DataTypes.INTEGER,
    defaultValue: 70,
  },
  timeLimit: {
    type: DataTypes.INTEGER, // in minutes
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  timestamps: true,
  tableName: 'assessments',
})

module.exports = Assessment
