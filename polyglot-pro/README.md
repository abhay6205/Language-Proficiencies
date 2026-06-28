# 📚 Polyglot Pro - Language Learning Platform

A comprehensive, modern AI-powered language learning platform built with React, Node.js, and PostgreSQL.

## ✅ Project Status

**Verification:** ✅ COMPLETE  
**Build Status:** ✅ SUCCESSFUL  
**Ready to Run:** ✅ YES

See [VERIFICATION_REPORT.md](./VERIFICATION_REPORT.md) for full verification details.

---

## 🚀 Quick Start

**Want step-by-step instructions?**  
→ See [SETUP_AND_RUN.md](./SETUP_AND_RUN.md) for complete setup guide

**In a hurry?**
```bash
# Navigate to project
cd polyglot-pro

# Install all dependencies (one time)
npm run install-all

# Create .env files (see SETUP_AND_RUN.md)
# Setup PostgreSQL database (see SETUP_AND_RUN.md)

# Start development servers
npm run dev
```

**Access:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- API Health: http://localhost:5000/health
- Documentation: See `/docs` folder

---

## 📁 Project Structure

```
polyglot-pro/
├── frontend/              # React 18 + Vite application
├── backend/              # Express.js API server
├── docs/                 # Documentation
├── docker-compose.yml    # Docker setup
├── package.json          # Root package config
└── README.md             # This file
```

**For detailed information, see:**
- [Frontend README](./frontend/README.md) - Frontend setup & structure
- [Backend README](./backend/README.md) - Backend setup & structure
- [Documentation](./docs/README.md) - Complete guides

---

## 🎯 Key Features

✅ **User Management** - Registration, authentication, profiles
✅ **Courses** - Browse, filter, enroll in language courses
✅ **Learning** - Interactive lessons with video support
✅ **Assessments** - Quizzes and progress tracking
✅ **Dashboard** - Personalized learning dashboard
✅ **Responsive** - Mobile-first design
✅ **Secure** - JWT authentication, role-based access
✅ **Scalable** - Docker ready, production deployable

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Redux, Tailwind CSS, Vite |
| **Backend** | Node.js, Express, PostgreSQL, Sequelize |
| **DevOps** | Docker, Docker Compose |

---

## 📖 Documentation

**Quick Access:**
- 🚀 **[SETUP_AND_RUN.md](./SETUP_AND_RUN.md)** - **START HERE** - Complete setup guide (6 steps)
- ✅ **[VERIFICATION_REPORT.md](./VERIFICATION_REPORT.md)** - Project verification status
- 🎯 **[GETTING_STARTED.md](./GETTING_STARTED.md)** - Find what you need

**Full Documentation in `/docs`:**
1. **[QUICK_START.md](./docs/QUICK_START.md)** - 5-minute setup
2. **[SETUP.md](./docs/SETUP.md)** - Detailed installation
3. **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - System design
4. **[API.md](./docs/API.md)** - Complete API reference (30+ endpoints)
5. **[DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - Production deployment

---

## 🐳 Docker Setup

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## 📦 Available Commands

```bash
# Development
npm run dev              # Start dev servers
npm run build            # Build for production
npm start                # Start production server

# Database
npm run db:create        # Create database
npm run db:migrate       # Run migrations
npm run db:seed          # Seed initial data

# Installation
npm run install-all      # Install all dependencies
```

---

## 🔐 Environment Setup

1. **Backend** (create `backend/.env`)
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_NAME=polyglot_pro
   DB_USER=postgres
   DB_PASSWORD=password
   JWT_SECRET=your_secret_key
   ```

2. **Frontend** (create `frontend/.env`)
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

See `.env.example` files for complete templates.

---

## 🚀 Deployment

Deploy to multiple platforms:
- **Heroku** - Backend API
- **Vercel/Netlify** - Frontend
- **AWS** - Full stack
- **Docker** - Self-hosted

[See Deployment Guide →](./docs/DEPLOYMENT.md)

---

## 🏃 Getting Started

**First time here?** Read in this order:
1. This README (you are here)
2. [SETUP_AND_RUN.md](./SETUP_AND_RUN.md) - How to run the project
3. [VERIFICATION_REPORT.md](./VERIFICATION_REPORT.md) - What's been tested
4. [GETTING_STARTED.md](./GETTING_STARTED.md) - Find specific guides
5. [docs/](./docs/) - Detailed documentation

---

## 🤝 Contributing

**Want to contribute?**
1. Read [CONTRIBUTING.md](./CONTRIBUTING.md)
2. Create a feature branch
3. Make your changes
4. Submit a pull request

[See Contributing Guide →](./CONTRIBUTING.md)

---

## 📞 Support

- 📧 Email: support@polyglotpro.com
- 🐛 Issues: [Report here](https://github.com/your-repo/issues)
- 💬 Discussions: [Join us](https://github.com/your-repo/discussions)

---

## 📄 License
## 📋 Next Steps

1. **[SETUP_AND_RUN.md](./SETUP_AND_RUN.md)** - Follow the 6-step setup guide
2. **npm run dev** - Start the development servers
3. **Open http://localhost:5173** - See the app running
4. **Check the docs** - Learn about the architecture
5. **Start coding!** - Build amazing features

---

**Made with ❤️ to help you master languages**  
**Status:** ✅ Fully verified and ready to run!
MIT License - See LICENSE file

---

## 👥 Team

- **Abhay Kumar** - Full Stack Development
- **Shaik Mehere Nigaar** - UI/UX Design
- **Khushi** - Documentation & Research

---

**Made with ❤️ to help you master languages**
