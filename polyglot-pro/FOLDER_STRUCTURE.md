# 📁 Project Structure Guide

Complete guide to understanding Polyglot Pro's folder organization.

## Directory Tree

```
polyglot-pro/                          # Project root
│
├── 📂 frontend/                       # React application
│   ├── public/                        # Static assets
│   ├── src/
│   │   ├── components/                # Reusable UI components
│   │   │   ├── Navigation.jsx         # Main navigation bar
│   │   │   ├── Footer.jsx             # Footer component
│   │   │   └── PrivateRoute.jsx       # Protected route wrapper
│   │   │
│   │   ├── pages/                     # Page components
│   │   │   ├── Home.jsx               # Landing page
│   │   │   ├── Courses.jsx            # Course catalog
│   │   │   ├── CourseDetail.jsx       # Individual course
│   │   │   ├── Lesson.jsx             # Lesson player
│   │   │   ├── Login.jsx              # Login form
│   │   │   ├── Register.jsx           # Registration form
│   │   │   ├── Dashboard.jsx          # Learning dashboard
│   │   │   ├── Profile.jsx            # User profile
│   │   │   └── NotFound.jsx           # 404 page
│   │   │
│   │   ├── services/                  # API communication layer
│   │   │   ├── api.js                 # Axios instance & config
│   │   │   └── index.js               # API service functions
│   │   │
│   │   ├── slices/                    # Redux state slices
│   │   │   ├── authSlice.js           # User auth state
│   │   │   ├── courseSlice.js         # Courses state
│   │   │   └── userSlice.js           # User profile state
│   │   │
│   │   ├── context/                   # React Context API
│   │   │   └── AuthContext.jsx        # Auth context provider
│   │   │
│   │   ├── styles/                    # Global styles
│   │   │   └── global.css             # Global CSS variables
│   │   │
│   │   ├── utils/                     # Utility functions (if needed)
│   │   │   └── helpers.js             # Helper functions
│   │   │
│   │   ├── hooks/                     # Custom React hooks (if needed)
│   │   │   └── useAuth.js             # Custom auth hook
│   │   │
│   │   ├── App.jsx                    # Main app component & routes
│   │   ├── main.jsx                   # React entry point
│   │   ├── store.js                   # Redux store configuration
│   │   │
│   │   ├── index.html                 # HTML template
│   │   ├── vite.config.js             # Vite build config
│   │   ├── tailwind.config.js         # Tailwind CSS config
│   │   ├── postcss.config.js          # PostCSS config
│   │   ├── .eslintrc.cjs              # ESLint config
│   │   ├── .env.example               # Environment template
│   │   ├── package.json               # Dependencies
│   │   └── README.md                  # Frontend-specific docs
│   │
│   ├── node_modules/                  # Dependencies (ignored in git)
│   ├── dist/                          # Build output (ignored in git)
│   └── .gitignore                     # Git ignore rules
│
│
├── 📂 backend/                        # Express API server
│   ├── src/
│   │   ├── models/                    # Database models
│   │   │   ├── User.js                # User model
│   │   │   ├── Course.js              # Course model
│   │   │   ├── Lesson.js              # Lesson model
│   │   │   ├── Enrollment.js          # Enrollment model
│   │   │   ├── Assessment.js          # Assessment model
│   │   │   ├── Subscription.js        # Subscription model
│   │   │   └── index.js               # Model associations
│   │   │
│   │   ├── routes/                    # API routes
│   │   │   ├── authRoutes.js          # Auth endpoints
│   │   │   ├── userRoutes.js          # User endpoints
│   │   │   ├── courseRoutes.js        # Course endpoints
│   │   │   ├── lessonRoutes.js        # Lesson endpoints
│   │   │   └── assessmentRoutes.js    # Assessment endpoints
│   │   │
│   │   ├── middleware/                # Express middleware
│   │   │   ├── authMiddleware.js      # JWT authentication
│   │   │   └── errorHandler.js        # Error handling
│   │   │
│   │   ├── config/                    # Configuration
│   │   │   ├── database.js            # Sequelize instance
│   │   │   └── constants.js           # Config constants
│   │   │
│   │   ├── utils/                     # Utility functions
│   │   │   ├── logger.js              # Logging setup
│   │   │   └── helpers.js             # Helper functions
│   │   │
│   │   ├── services/                  # Business logic (optional)
│   │   │   └── emailService.js        # Email sending
│   │   │
│   │   └── index.js                   # Server entry point
│   │
│   ├── .env.example                   # Environment template
│   ├── .sequelizerc                   # Sequelize config
│   ├── Dockerfile                     # Docker image
│   ├── package.json                   # Dependencies
│   ├── README.md                      # Backend-specific docs
│   │
│   ├── node_modules/                  # Dependencies (ignored in git)
│   ├── .gitignore                     # Git ignore rules
│   │
│   └── migrations/                    # Database migrations (generated)
│       └── [timestamp]-initial.js     # Migration files
│
│
├── 📂 docs/                           # Documentation
│   ├── README.md                      # Documentation overview
│   ├── QUICK_START.md                 # 5-minute quick start
│   ├── SETUP.md                       # Detailed setup guide
│   ├── ARCHITECTURE.md                # System architecture
│   ├── API.md                         # API reference
│   ├── DEPLOYMENT.md                  # Deployment guides
│   └── OVERVIEW.md                    # Project overview
│
│
├── 📄 Root Level Files
│   ├── docker-compose.yml             # Docker setup
│   ├── docker-compose.prod.yml        # Production Docker setup (optional)
│   ├── .dockerignore                  # Docker ignore rules (optional)
│   ├── package.json                   # Root package (scripts)
│   ├── .gitignore                     # Git ignore rules
│   │
│   ├── README.md                      # Main project readme
│   ├── CONTRIBUTING.md                # Contributing guidelines
│   ├── LICENSE                        # MIT License
│   │
│   └── .github/                       # GitHub configuration (optional)
│       └── workflows/                 # CI/CD workflows (optional)
│           └── ci.yml                 # GitHub Actions CI
│
│
└── .env files (DO NOT COMMIT)
    ├── backend/.env                   # Backend config
    └── frontend/.env                  # Frontend config
```

---

## 🗂️ Folder Purposes

### `/frontend`
**React 18 application with Vite**
- User-facing web interface
- Component-based architecture
- Redux state management
- Tailwind CSS styling

### `/backend`
**Express.js REST API**
- RESTful endpoints
- Database models & ORM
- Authentication & authorization
- Business logic

### `/docs`
**Complete documentation**
- Setup instructions
- API reference
- Architecture overview
- Deployment guides

### `/docker`
**Containerization**
- Docker Compose orchestration
- Container configuration
- Environment management

---

## 📦 Important Files

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Orchestrate all services locally |
| `package.json` (root) | Root-level scripts |
| `README.md` (root) | Main project overview |
| `CONTRIBUTING.md` | Contribution guidelines |
| `LICENSE` | MIT license |
| `.gitignore` | Git ignore patterns |

---

## 🎯 Key Directories Explained

### Frontend Structure

**`src/components/`** - Small, reusable pieces
- Used across multiple pages
- Examples: Navigation, Footer, Buttons

**`src/pages/`** - Full page components
- One component per route
- Handle page-level logic

**`src/services/`** - API communication
- API calls
- Data fetching
- Request/response handling

**`src/slices/`** - Redux state
- Global state management
- Actions and reducers
- State persistence

### Backend Structure

**`models/`** - Database representation
- Table schemas
- Relationships
- Validations

**`routes/`** - API endpoints
- HTTP route handlers
- Request validation
- Response formatting

**`middleware/`** - Request processing
- Authentication checks
- Error handling
- CORS, logging

---

## 🔄 Data Flow

```
Frontend
├── User Action
├── Component calls service
├── Service makes API call
├── Redux updated
├── Component re-renders
│
Backend
├── Route receives request
├── Middleware validates
├── Controller processes
├── Database query
├── Response sent
```

---

## 📝 File Naming Conventions

### React Components
```
- PascalCase: HomePage.jsx, UserProfile.jsx
- Files match component name
- One component per file
```

### JavaScript Files
```
- camelCase: userService.js, authMiddleware.js
- descriptive names
- clear purpose
```

### Database Models
```
- PascalCase: User.js, Course.js
- Singular names
- represent single entity
```

### Routes
```
- descriptive names: userRoutes.js, courseRoutes.js
- plural for collections
```

---

## 🚫 Ignored Files

**Never commit:**
- `node_modules/` - Dependencies
- `.env` - Secrets
- `dist/` - Build output
- `.DS_Store` - macOS files
- `*.log` - Log files
- `.idea/` - IDE files

See `.gitignore` for complete list.

---

## 🚀 Adding New Features

### Add New Page
```
1. Create component in frontend/src/pages/MyPage.jsx
2. Add route in frontend/src/App.jsx
3. Create API service in frontend/src/services/myService.js
4. Update backend with new routes if needed
5. Document in docs/API.md
```

### Add New API Endpoint
```
1. Create model in backend/src/models/ if needed
2. Add route in backend/src/routes/myRoutes.js
3. Add route to backend/src/index.js
4. Create service in frontend/src/services/
5. Update docs/API.md
```

### Add New Database Model
```
1. Create model in backend/src/models/MyModel.js
2. Add associations in backend/src/models/index.js
3. Generate migration: npx sequelize-cli migration:generate --name...
4. Update documentation
```

---

## 📊 File Count Summary

- **Frontend Components:** 10+
- **Frontend Pages:** 9
- **Backend Routes:** 5 files
- **API Endpoints:** 30+
- **Database Models:** 6
- **Documentation Pages:** 7

---

## 🔗 Related Files

For detailed information on specific parts:
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)
- [Architecture Guide](./docs/ARCHITECTURE.md)
- [API Reference](./docs/API.md)

---

**This structure makes the project scalable, maintainable, and easy for new developers to understand!**
