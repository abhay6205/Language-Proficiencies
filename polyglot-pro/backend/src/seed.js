const path = require('path')
const fs = require('fs')
const sequelize = require('./config/database')
const config = require('./config/constants')
const { User, Course, Lesson, Assessment } = require('./models')

const seedData = async () => {
  try {
    // Ensure data directory exists
    const dataDir = path.dirname(config.DB_STORAGE)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    await sequelize.authenticate()
    console.log('Database connected')

    // Force sync (recreate tables)
    await sequelize.sync({ force: true })
    console.log('Database tables created')

    // Create demo instructor
    const instructor = await User.create({
      name: 'Maria Rodriguez',
      email: 'instructor@polyglotpro.com',
      password: 'password123',
      role: 'instructor',
      bio: 'Certified polyglot and language instructor with 10+ years of teaching experience.',
      nativeLanguage: 'Spanish',
      targetLanguages: JSON.stringify(['English', 'French', 'Portuguese']),
      isEmailVerified: true,
    })

    // Create demo student
    const student = await User.create({
      name: 'Demo User',
      email: 'demo@polyglotpro.com',
      password: 'password123',
      role: 'student',
      nativeLanguage: 'English',
      targetLanguages: JSON.stringify(['Spanish', 'French']),
      isEmailVerified: true,
    })

    console.log('Users created')

    // Create courses
    const courses = await Course.bulkCreate([
      {
        title: 'Spanish for Beginners',
        description: 'Start your Spanish journey with interactive lessons covering everyday conversation, grammar basics, and cultural insights. Perfect for absolute beginners.',
        language: 'Spanish',
        level: 'beginner',
        thumbnail: 'https://images.unsplash.com/photo-1489945052260-4f21c52571ef?w=600',
        price: 49.99,
        instructorId: instructor.id,
        duration: 480,
        lessonsCount: 8,
        rating: 4.8,
        enrollmentCount: 1250,
        isPublished: true,
        tags: JSON.stringify(['conversation', 'grammar', 'culture']),
      },
      {
        title: 'French Essentials',
        description: 'Master the fundamentals of French language including pronunciation, basic grammar, and essential vocabulary for travel and daily communication.',
        language: 'French',
        level: 'beginner',
        thumbnail: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600',
        price: 59.99,
        instructorId: instructor.id,
        duration: 600,
        lessonsCount: 10,
        rating: 4.7,
        enrollmentCount: 980,
        isPublished: true,
        tags: JSON.stringify(['pronunciation', 'vocabulary', 'travel']),
      },
      {
        title: 'Japanese: From Zero to Hero',
        description: 'A comprehensive Japanese course covering Hiragana, Katakana, basic Kanji, grammar structures, and conversational Japanese for everyday situations.',
        language: 'Japanese',
        level: 'beginner',
        thumbnail: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600',
        price: 79.99,
        instructorId: instructor.id,
        duration: 900,
        lessonsCount: 12,
        rating: 4.9,
        enrollmentCount: 750,
        isPublished: true,
        tags: JSON.stringify(['hiragana', 'katakana', 'kanji', 'conversation']),
      },
      {
        title: 'German for Professionals',
        description: 'Business German designed for professionals. Learn formal communication, business vocabulary, email writing, and presentation skills in German.',
        language: 'German',
        level: 'intermediate',
        thumbnail: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600',
        price: 69.99,
        instructorId: instructor.id,
        duration: 720,
        lessonsCount: 10,
        rating: 4.6,
        enrollmentCount: 520,
        isPublished: true,
        tags: JSON.stringify(['business', 'professional', 'formal']),
      },
      {
        title: 'Mandarin Chinese Mastery',
        description: 'Dive deep into Mandarin Chinese with tone training, character writing, grammar patterns, and real-world conversation practice with native speakers.',
        language: 'Mandarin',
        level: 'intermediate',
        thumbnail: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=600',
        price: 89.99,
        instructorId: instructor.id,
        duration: 1080,
        lessonsCount: 15,
        rating: 4.8,
        enrollmentCount: 640,
        isPublished: true,
        tags: JSON.stringify(['tones', 'characters', 'conversation']),
      },
      {
        title: 'Advanced Spanish Conversation',
        description: 'Take your Spanish to the next level with advanced conversation topics, idiomatic expressions, debate practice, and cultural deep dives.',
        language: 'Spanish',
        level: 'advanced',
        thumbnail: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=600',
        price: 69.99,
        instructorId: instructor.id,
        duration: 540,
        lessonsCount: 8,
        rating: 4.7,
        enrollmentCount: 380,
        isPublished: true,
        tags: JSON.stringify(['conversation', 'idioms', 'advanced']),
      },
    ])

    console.log('Courses created:', courses.length)

    // Create lessons for "Spanish for Beginners"
    const spanishCourse = courses[0]
    const spanishLessons = await Lesson.bulkCreate([
      {
        courseId: spanishCourse.id,
        title: 'Greetings & Introductions',
        description: 'Learn how to greet people and introduce yourself in Spanish.',
        content: JSON.stringify({ text: '<h3>Basic Greetings</h3><p>Hola - Hello</p><p>Buenos días - Good morning</p><p>Buenas tardes - Good afternoon</p><p>Buenas noches - Good evening</p><p>¿Cómo estás? - How are you?</p><p>Me llamo... - My name is...</p>' }),
        duration: 30,
        order: 1,
        type: 'interactive',
        isPublished: true,
      },
      {
        courseId: spanishCourse.id,
        title: 'Numbers & Counting',
        description: 'Master Spanish numbers from 1 to 100.',
        content: JSON.stringify({ text: '<h3>Numbers 1-10</h3><p>uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez</p>' }),
        duration: 25,
        order: 2,
        type: 'video',
        isPublished: true,
      },
      {
        courseId: spanishCourse.id,
        title: 'Common Phrases',
        description: 'Essential phrases for everyday communication.',
        content: JSON.stringify({ text: '<h3>Essential Phrases</h3><p>Por favor - Please</p><p>Gracias - Thank you</p><p>De nada - You\'re welcome</p>' }),
        duration: 35,
        order: 3,
        type: 'interactive',
        isPublished: true,
      },
      {
        courseId: spanishCourse.id,
        title: 'Present Tense Verbs',
        description: 'Introduction to regular verb conjugations in present tense.',
        content: JSON.stringify({ text: '<h3>Regular -AR Verbs</h3><p>hablar (to speak), comer (to eat), vivir (to live)</p>' }),
        duration: 45,
        order: 4,
        type: 'video',
        isPublished: true,
      },
      {
        courseId: spanishCourse.id,
        title: 'Food & Dining',
        description: 'Vocabulary for restaurants and food ordering.',
        content: JSON.stringify({ text: '<h3>At the Restaurant</h3><p>La cuenta, por favor - The check, please</p>' }),
        duration: 30,
        order: 5,
        type: 'interactive',
        isPublished: true,
      },
      {
        courseId: spanishCourse.id,
        title: 'Directions & Travel',
        description: 'Ask for and give directions in Spanish.',
        content: JSON.stringify({ text: '<h3>Directions</h3><p>¿Dónde está...? - Where is...?</p>' }),
        duration: 35,
        order: 6,
        type: 'video',
        isPublished: true,
      },
      {
        courseId: spanishCourse.id,
        title: 'Weather & Time',
        description: 'Talk about weather and tell time in Spanish.',
        content: JSON.stringify({ text: '<h3>Weather</h3><p>Hace sol - It\'s sunny</p><p>Llueve - It\'s raining</p>' }),
        duration: 25,
        order: 7,
        type: 'text',
        isPublished: true,
      },
      {
        courseId: spanishCourse.id,
        title: 'Review & Assessment',
        description: 'Review everything learned and take the final assessment.',
        content: JSON.stringify({ text: '<h3>Course Review</h3><p>Let\'s review everything we\'ve learned!</p>' }),
        duration: 40,
        order: 8,
        type: 'quiz',
        isPublished: true,
      },
    ])

    console.log('Lessons created:', spanishLessons.length)

    // Create lessons for French course
    const frenchCourse = courses[1]
    await Lesson.bulkCreate([
      {
        courseId: frenchCourse.id,
        title: 'French Pronunciation Basics',
        description: 'Master the unique sounds of the French language.',
        content: JSON.stringify({ text: '<h3>French Sounds</h3><p>Learn the nasal vowels and silent letters.</p>' }),
        duration: 30,
        order: 1,
        type: 'video',
        isPublished: true,
      },
      {
        courseId: frenchCourse.id,
        title: 'Greetings in French',
        description: 'Essential French greetings and courtesies.',
        content: JSON.stringify({ text: '<h3>Bonjour!</h3><p>Bonjour - Hello/Good day</p><p>Bonsoir - Good evening</p><p>Merci - Thank you</p>' }),
        duration: 25,
        order: 2,
        type: 'interactive',
        isPublished: true,
      },
      {
        courseId: frenchCourse.id,
        title: 'Articles & Gender',
        description: 'Understanding masculine and feminine nouns.',
        content: JSON.stringify({ text: '<h3>French Articles</h3><p>le/la/les - the</p><p>un/une/des - a/some</p>' }),
        duration: 35,
        order: 3,
        type: 'text',
        isPublished: true,
      },
    ])

    // Create an assessment for the Spanish course
    await Assessment.create({
      lessonId: spanishLessons[7].id, // Review lesson
      title: 'Spanish Basics Final Quiz',
      description: 'Test your knowledge of basic Spanish',
      questions: JSON.stringify([
        {
          question: 'How do you say "Hello" in Spanish?',
          options: ['Hola', 'Bonjour', 'Ciao', 'Hallo'],
          correctAnswer: 0,
          points: 10,
        },
        {
          question: 'What does "Gracias" mean?',
          options: ['Please', 'Sorry', 'Thank you', 'Hello'],
          correctAnswer: 2,
          points: 10,
        },
        {
          question: 'How do you say "Good morning" in Spanish?',
          options: ['Buenas noches', 'Buenos días', 'Buenas tardes', 'Buen día'],
          correctAnswer: 1,
          points: 10,
        },
      ]),
      type: 'quiz',
      passingScore: 70,
      timeLimit: 15,
      isPublished: true,
    })

    console.log('Assessment created')
    console.log('\n✅ Seed completed successfully!')
    console.log('\n📋 Demo Accounts:')
    console.log('  Instructor: instructor@polyglotpro.com / password123')
    console.log('  Student:    demo@polyglotpro.com / password123')
    console.log('\n🚀 Run `npm run dev` to start the server!')

    process.exit(0)
  } catch (error) {
    console.error('Seed failed:', error)
    process.exit(1)
  }
}

seedData()
