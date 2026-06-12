const User = require('./User')
const Course = require('./Course')
const Lesson = require('./Lesson')
const Enrollment = require('./Enrollment')
const Assessment = require('./Assessment')
const Subscription = require('./Subscription')

// Define associations
User.hasMany(Course, { as: 'courses', foreignKey: 'instructorId' })
Course.belongsTo(User, { as: 'instructor', foreignKey: 'instructorId' })

Course.hasMany(Lesson, { as: 'lessons', foreignKey: 'courseId' })
Lesson.belongsTo(Course, { as: 'course', foreignKey: 'courseId' })

Lesson.hasMany(Assessment, { as: 'assessments', foreignKey: 'lessonId' })
Assessment.belongsTo(Lesson, { as: 'lesson', foreignKey: 'lessonId' })

User.hasMany(Enrollment, { as: 'enrollments', foreignKey: 'userId' })
Enrollment.belongsTo(User, { as: 'user', foreignKey: 'userId' })

Course.hasMany(Enrollment, { as: 'enrollments', foreignKey: 'courseId' })
Enrollment.belongsTo(Course, { as: 'course', foreignKey: 'courseId' })

User.hasOne(Subscription, { as: 'subscription', foreignKey: 'userId' })
Subscription.belongsTo(User, { as: 'user', foreignKey: 'userId' })

module.exports = {
  User,
  Course,
  Lesson,
  Enrollment,
  Assessment,
  Subscription,
}
