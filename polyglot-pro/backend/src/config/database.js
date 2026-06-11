const { Sequelize } = require('sequelize')
const config = require('./constants')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: config.DB_STORAGE,
  logging: config.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
})

module.exports = sequelize
