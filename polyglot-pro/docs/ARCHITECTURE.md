# 🏗️ Architecture - System Design

Complete overview of Polyglot Pro architecture.

## 📊 System Overview

```
┌─────────────────────┐
│   Web Browser       │
└──────────┬──────────┘
           │ HTTP/WS
┌──────────▼──────────┐         ┌──────────────┐
│  Frontend (React)   │◄───────►│  CDN/Cache   │
│   Port: 5173        │         └──────────────┘
└──────────┬──────────┘
           │ REST API
┌──────────▼──────────────┐
│  Backend (Express.js)   │
│   Port: 5000            │
│  • Authentication       │
│  • Course Management    │
│  • Lesson Delivery      │
│  • Assessments          │
└──────────┬──────────────┘
           │ SQL
┌──────────▼──────────────┐
│  PostgreSQL Database    │
│   Port: 5432            │
│  • Users                │
│  • Courses              │
│  • Enrollments          │
│  • Assessments          │
└─────────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend Layer
```
React 18
  ├─ Redux Toolkit (State Management)
  ├─ React Router (Navigation)
  ├─ Tailwind CSS (Styling)
  ├─ Vite (Build Tool)
  └─ Axios (HTTP Client)
```

### Backend Layer
```
Express.js
  ├─ Sequelize ORM (Database Layer)
  ├─ JWT (Authentication)
  ├─ bcryptjs (Password Hashing)
  ├─ Stripe (Payments)
  └─ Nodemailer (Email)
```

### Database Layer
```
PostgreSQL
  ├─ User Management
  ├─ Course Content
  ├─ Enrollment Tracking
  ├─ Assessment Results
  └─ Transaction Logging
```

---

## 📁 Frontend Architecture

```
frontend/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Navigation.jsx
│   │   ├── Footer.jsx
│   │   └── PrivateRoute.jsx
│   │
│   ├── pages/            # Page components
│   │   ├── Home.jsx
│   │   ├── Courses.jsx
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   └── ...
│   │
│   ├── services/         # API communication
│   │   ├── api.js        # Axios config
│   │   └── index.js      # API methods
│   │
│   ├── slices/           # Redux state
│   │   ├── authSlice.js
│   │   ├── courseSlice.js
│   │   └── userSlice.js
│   │
│   ├── context/          # React Context
│   │   └── AuthContext.jsx
│   │
│   ├── styles/           # Global styles
│   ├── App.jsx           # Main component
│   ├── main.jsx          # Entry point
│   └── store.js          # Redux store
```

### State Flow

```
Redux Store (authSlice, courseSlice, userSlice)
       ▲
       │ useSelector
       │
    Components
       │
       │ useDispatch
       ▼
    Redux Actions
```

---

## 📡 Backend Architecture

```
backend/
├── src/
│   ├── models/           # Database models
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Lesson.js
│   │   ├── Enrollment.js
│   │   ├── Assessment.js
│   │   └── Subscription.js
│   │
│   ├── routes/           # API routes
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── lessonRoutes.js
│   │   └── assessmentRoutes.js
│   │
│   ├── middleware/       # Express middleware
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   │
│   ├── config/           # Configuration
│   │   ├── database.js
│   │   └── constants.js
│   │
│   └── index.js          # Server entry point
```

### Request Flow

```
HTTP Request
    ▼
Express Middleware
    ├─ CORS
    ├─ Body Parser
    └─ Authentication
    ▼
Route Handler
    ▼
Controller Logic
    ▼
Database Query (Sequelize)
    ▼
Response JSON
    ▼
HTTP Response
```

---

## 🗄️ Database Schema

### Entity Relationships

```
User ←──────────── Course (instructor)
 │                      │
 │                      └─── Lesson
 │
 ├─── Enrollment ←─────── Course
 │
 ├─── Subscription
 │
 └─── Assessment Results
```

### Key Tables

| Table | Fields | Purpose |
|-------|--------|---------|
| **users** | id, name, email, password, role | User accounts |
| **courses** | id, title, language, level, instructorId | Course catalog |
| **lessons** | id, courseId, title, content, videoUrl | Lesson content |
| **enrollments** | id, userId, courseId, progress, status | User enrollments |
| **assessments** | id, lessonId, questions, type | Quizzes |
| **subscriptions** | id, userId, plan, status | Payments |

---

## 🔐 Authentication Flow

```
1. User submits email + password
           ▼
2. Backend hashes password
           ▼
3. Compare with stored hash
           ▼
4. Generate JWT token (7 days expiry)
           ▼
5. Return token to frontend
           ▼
6. Frontend stores in localStorage
           ▼
7. Frontend sends token in Authorization header
           ▼
8. Backend verifies token on protected routes
```

---

## 🔄 Data Flow Example

### User Enrolls in Course

```
Frontend
├─ User clicks "Enroll"
├─ Redux dispatch: enrollCourse(courseId)
├─ API call: POST /api/courses/:id/enroll
│
Backend
├─ Middleware verifies JWT token
├─ Checks user exists
├─ Checks not already enrolled
├─ Creates Enrollment record
├─ Increments course enrollmentCount
├─ Returns success response
│
Frontend
├─ Receives enrollment data
├─ Updates Redux store
├─ Shows success toast
├─ Redirects to dashboard
```

---

## 📊 API Layer

### RESTful Endpoints

```
Authentication
├─ POST /auth/register
├─ POST /auth/login
└─ POST /auth/logout

Users
├─ GET /users/profile
├─ PUT /users/profile
├─ GET /users/progress
└─ GET /users/courses

Courses
├─ GET /courses
├─ GET /courses/:id
├─ GET /courses/:id/lessons
└─ POST /courses/:id/enroll

Lessons
├─ GET /lessons/:id
└─ POST /lessons/:id/complete

Assessments
├─ GET /assessments/:id
└─ POST /assessments/:id/submit
```

---

## 🔄 Deployment Architecture

### Development

```
localhost:5173  ─┐
localhost:5000  ─┼─ Single Machine
localhost:5432  ─┘
```

### Production

```
┌─────────────────┐
│  CloudFlare CDN │
│  (Frontend)     │
└────────┬────────┘
         │
┌────────▼────────┐      ┌──────────────┐
│  Vercel/Netlify │      │ API Gateway  │
│  (Frontend)     │      │  (SSL/CORS)  │
└────────┬────────┘      └──────┬───────┘
         │                      │
         │              ┌───────▼──────┐
         │              │ Heroku/AWS   │
         │              │ (Backend)    │
         │              └───────┬──────┘
         │                      │
         │              ┌───────▼──────┐
         │              │ AWS RDS      │
         │              │ PostgreSQL   │
         │              └──────────────┘
         └─ HTTPS ──────────────┘
```

---

## 🔌 Integration Points

### External Services

1. **Stripe** - Payment processing
   ```
   Frontend → Stripe.js → Stripe API
   Backend → Stripe API → Stripe Webhooks
   ```

2. **Email** - Nodemailer
   ```
   Backend → SMTP Server → User Email
   ```

3. **File Storage** - Optional
   ```
   Frontend → Upload → Backend → S3/Cloudinary
   ```

---

## 📈 Scalability Considerations

### Current Setup
- Single backend instance
- Single database
- Single frontend build

### Future Scaling
```
Load Balancer
    ├─ Backend Instance 1
    ├─ Backend Instance 2
    └─ Backend Instance 3
         ▼
    Database Replication
    ├─ Primary (Write)
    └─ Replicas (Read)
         ▼
    Cache Layer (Redis)
```

---

## 🔒 Security Layers

```
1. HTTPS/TLS
2. CORS Configuration
3. Input Validation
4. JWT Authentication
5. Role-Based Access Control
6. Password Hashing (bcrypt)
7. SQL Injection Prevention (ORM)
8. Error Message Sanitization
```

---

## 📊 Performance Optimization

### Frontend
- Code splitting with React.lazy
- Image optimization
- CSS-in-JS optimization
- Caching strategies

### Backend
- Database query optimization
- Connection pooling
- Caching (Redis ready)
- Compression (gzip)

### Database
- Indexes on frequently queried columns
- Query optimization
- Connection pooling
- Regular backups

---

## 🚀 Deployment Flow

```
1. Commit to GitHub
   ▼
2. CI/CD Pipeline
   ├─ Run tests
   ├─ Build frontend
   ├─ Build backend
   └─ Build Docker images
   ▼
3. Push to Registry
   ├─ Vercel (Frontend)
   ├─ Heroku/Docker Registry (Backend)
   ▼
4. Deploy to Production
   ├─ Backend migrations
   ├─ Health checks
   ├─ Database validation
   ▼
5. Monitor & Alert
   ├─ Error tracking
   ├─ Performance monitoring
   └─ User analytics
```

---

## 🔍 Monitoring & Observability

### Logging
- Backend: Winston logger
- Frontend: Console + Sentry
- Database: Query logs

### Metrics
- Response times
- Error rates
- Database performance
- User engagement

### Alerts
- High error rates
- Database down
- API slow response
- Deployment failures

---

**For implementation details, see:**
- [API Reference](./API.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Setup Instructions](./SETUP.md)
