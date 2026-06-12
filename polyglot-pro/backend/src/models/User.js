const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const bcrypt = require('bcryptjs')

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  bio: {
    type: DataTypes.TEXT,
    defaultValue: null,
  },
  nativeLanguage: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  targetLanguages: {
    type: DataTypes.JSON, // Changed from ARRAY for SQLite compatibility
    defaultValue: [],
  },
  proficiencyLevel: {
    type: DataTypes.STRING,
    defaultValue: 'beginner',
  },
  isEmailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  emailVerificationToken: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  lastLoginAt: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'student',
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  timestamps: true,
  tableName: 'users',
})

// Hash password before saving
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)
})

User.beforeUpdate(async (user) => {
  if (user.changed('password')) {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
  }
})

// Method to compare password
User.prototype.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password)
}

module.exports = User
