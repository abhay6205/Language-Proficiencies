const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Subscription = sequelize.define('Subscription', {
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
  planId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  plan: {
    type: DataTypes.STRING,
    defaultValue: 'free',
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',
  },
  stripeSubscriptionId: {
    type: DataTypes.STRING,
  },
  stripeCustomerId: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'USD',
  },
  billingCycle: {
    type: DataTypes.STRING,
    defaultValue: 'monthly',
  },
  startDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  endDate: {
    type: DataTypes.DATE,
  },
  nextBillingDate: {
    type: DataTypes.DATE,
  },
  autoRenew: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
  tableName: 'subscriptions',
})

module.exports = Subscription
