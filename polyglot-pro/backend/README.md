# Backend - Polyglot Pro

Express.js REST API for language learning platform.

## 📁 Structure

```
backend/
├── src/
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Express middleware
│   ├── config/             # Configuration files
│   ├── utils/              # Utility functions
│   ├── services/           # Business logic (optional)
│   └── index.js            # Server entry point
├── .env.example            # Environment template
├── Dockerfile              # Docker configuration
├── .sequelizerc             # Sequelize config
├── package.json            # Dependencies
└── README.md               # This file
```

## 🚀 Quick Start

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Create database
npx sequelize-cli db:create

# Run migrations
npx sequelize-cli db:migrate

# Start dev server
npm run dev

# Start production server
npm start
```

## 🎯 Available Scripts

```bash
npm run dev          # Start with nodemon (auto-reload)
npm start            # Start production server
npm test             # Run tests
npm run migrate      # Run database migrations
npm run migrate:undo # Undo migrations
npm run seed         # Seed database
npm run seed:undo    # Undo seeds
```

## 📦 Key Dependencies

- **Express** - Web framework
- **PostgreSQL** - Database
- **Sequelize** - ORM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Axios** - HTTP client
- **Stripe** - Payment processing
- **Nodemailer** - Email service

## 🔧 Configuration

### Environment Variables

Create `.env` file:
```env
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=polyglot_pro
DB_USER=postgres
DB_PASSWORD=password

# JWT
JWT_SECRET=your_secret_key_change_in_production
JWT_EXPIRE=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxx

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Frontend
FRONTEND_URL=http://localhost:5173
```

## 🗄️ Database Models

| Model | Purpose |
|-------|---------|
| User | User accounts & profiles |
| Course | Language courses |
| Lesson | Course lessons |
| Enrollment | User course enrollments |
| Assessment | Quizzes & tests |
| Subscription | Payment subscriptions |

## 📡 API Routes

### Authentication
```
POST /api/auth/register       - Register user
POST /api/auth/login          - Login user
POST /api/auth/logout         - Logout user
```

### Users
```
GET /api/users/profile        - Get user profile (auth required)
PUT /api/users/profile        - Update profile (auth required)
GET /api/users/progress       - Get learning progress
GET /api/users/courses        - Get enrolled courses
POST /api/users/change-password - Change password
```

### Courses
```
GET /api/courses              - List all courses
GET /api/courses/:id          - Get course details
GET /api/courses/:id/lessons  - Get course lessons
POST /api/courses/:id/enroll  - Enroll in course (auth required)
POST /api/courses             - Create course (instructor only)
PUT /api/courses/:id          - Update course (instructor only)
```

### Lessons
```
GET /api/lessons/:id          - Get lesson
POST /api/lessons/:id/complete - Complete lesson (auth required)
POST /api/lessons             - Create lesson (instructor only)
```

### Assessments
```
GET /api/assessments/:id      - Get assessment
POST /api/assessments/:id/submit - Submit answers (auth required)
```

## 🔐 Authentication

- **JWT tokens** - Issued on login
- **Role-based access** - Student, Instructor, Admin
- **Protected routes** - Middleware checks authorization
- **Password hashing** - bcryptjs for security

## 🛠️ Development Tips

### Adding a New Route

1. Create handler in `src/routes/`
2. Import and use in `src/index.js`
3. Document in API reference

### Adding a Model

1. Create model file in `src/models/`
2. Add associations in `src/models/index.js`
3. Create migration file

### Database Migrations

```bash
# Create migration
npx sequelize-cli migration:generate --name add_column

# Run pending migrations
npx sequelize-cli db:migrate

# Undo last migration
npx sequelize-cli db:migrate:undo

# Undo all migrations
npx sequelize-cli db:migrate:undo:all
```

## 📧 Email Configuration

Configured for Gmail:
1. Enable 2-factor authentication
2. Create app password
3. Set `SMTP_USER` and `SMTP_PASS`

## 💳 Stripe Integration

Ready for payment processing:
1. Add Stripe keys to `.env`
2. Implement webhook handlers
3. Configure subscription plans

## 🧪 Testing

```bash
npm test              # Run all tests
npm test -- --watch  # Watch mode
npm test -- --coverage # Coverage report
```

## 🐳 Docker

Build and run in container:
```bash
docker build -t polyglot-api .
docker run -p 5000:5000 polyglot-api
```

## 📊 Database Connection

Using Sequelize ORM:
- Automatic connection pooling
- Query logging in development
- Relationship management
- Migration support

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Database error | Check DB credentials in `.env` |
| Port in use | Change `PORT` in `.env` |
| Migration error | Run `npx sequelize-cli db:migrate:undo:all` |
| Password issues | Use strong passwords, update bcrypt |

## 🚀 Deployment

See [Deployment Guide](../docs/DEPLOYMENT.md) for:
- Heroku deployment
- AWS deployment
- Docker deployment
- Production checklist

---

For frontend info, see [Frontend README](../frontend/README.md)
For full docs, see [Documentation](../docs/README.md)
