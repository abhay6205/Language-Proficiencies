import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiGlobe, FiUsers, FiAward, FiHeart } from 'react-icons/fi'

function About() {
  const values = [
    {
      icon: FiGlobe,
      title: 'Global Community',
      desc: 'Join learners from 150+ countries in our diverse language learning community.',
    },
    {
      icon: FiUsers,
      title: 'Expert Instructors',
      desc: 'Learn from certified native speakers and language professionals with years of teaching experience.',
    },
    {
      icon: FiAward,
      title: 'Recognized Certificates',
      desc: 'Earn industry-recognized certificates that validate your language proficiency.',
    },
    {
      icon: FiHeart,
      title: 'Passion for Learning',
      desc: 'We believe everyone deserves access to quality language education, powered by cutting-edge AI.',
    },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary via-secondary to-accent py-24 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Polyglot Pro</h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto">
              We're on a mission to make language learning accessible, interactive, and
              effective for everyone around the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-8 text-gray-800">Our Story</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Polyglot Pro was born from a simple belief: language barriers should never
              limit human connection. Founded in 2024, we combine cutting-edge AI technology
              with proven pedagogical methods to create an immersive learning experience
              that adapts to every learner's pace and style.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our platform offers courses in dozens of languages, from widely spoken ones
              like Spanish and Mandarin to less commonly taught languages. With interactive
              lessons, real-time feedback, and a supportive community, we're helping
              thousands of learners achieve fluency faster than ever before.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(({ icon: Icon, title, desc }, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition"
              >
                <Icon className="text-4xl text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-lg mb-8 text-gray-100">
              Join 50,000+ learners who are already mastering new languages with Polyglot Pro.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to="/courses"
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Browse Courses
              </Link>
              <Link
                to="/register"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition"
              >
                Sign Up Free
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
