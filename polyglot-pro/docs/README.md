# 📚 Documentation

Complete guides for Polyglot Pro platform.

## 📖 Available Guides

### 1. **[QUICK_START.md](./QUICK_START.md)** - Get Started in 5 Minutes
Quick commands and access points for development.

### 2. **[SETUP.md](./SETUP.md)** - Detailed Setup Instructions
- Prerequisites
- Local installation
- Database setup
- Configuration

### 3. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System Design
- Tech stack overview
- Project structure
- Data flow
- Database schema

### 4. **[API.md](./API.md)** - Complete API Reference
- All endpoints documented
- Request/response examples
- Authentication
- Error handling

### 5. **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production Deployment
- Heroku, Vercel, AWS, Docker
- Environment setup
- Monitoring
- Troubleshooting

### 6. **[OVERVIEW.md](./OVERVIEW.md)** - Project Overview
- Feature list
- Technology stack
- Project statistics

---

## 🎯 Choose Your Guide

**First time?**
→ Start with [QUICK_START.md](./QUICK_START.md)

**Setting up locally?**
→ Follow [SETUP.md](./SETUP.md)

**Building a feature?**
→ Check [API.md](./API.md)

**Going to production?**
→ Use [DEPLOYMENT.md](./DEPLOYMENT.md)

**Understanding the system?**
→ Read [ARCHITECTURE.md](./ARCHITECTURE.md)

---

## 🔍 Quick Reference

### Essential Commands

```bash
# Setup
npm run install-all
npm run dev

# Database
npm run db:create
npm run db:migrate

# Docker
docker-compose up -d
```

### Important Ports

- Frontend: 5173
- Backend: 5000
- PostgreSQL: 5432

### Key Environment Variables

```env
BACKEND: JWT_SECRET, DB_*, STRIPE_SECRET_KEY
FRONTEND: VITE_API_URL, VITE_STRIPE_PUBLISHABLE_KEY
```

---

## 📁 File Organization

```
docs/
├── README.md                 # This file
├── QUICK_START.md           # 5-minute start
├── SETUP.md                 # Detailed setup
├── ARCHITECTURE.md          # System design
├── API.md                   # API reference
└── DEPLOYMENT.md            # Deployment guide
```

---

## 💡 Common Tasks

### Add a New Course Type
1. Update Course model in backend
2. Create migration
3. Update frontend form

### Add New API Endpoint
1. Create route in backend
2. Update API.md documentation
3. Add service in frontend

### Deploy to Production
1. Follow DEPLOYMENT.md
2. Set environment variables
3. Run migrations

---

## ❓ FAQ

**Q: Where do I start?**
A: Check [QUICK_START.md](./QUICK_START.md)

**Q: How do I deploy?**
A: See [DEPLOYMENT.md](./DEPLOYMENT.md)

**Q: What APIs are available?**
A: Read [API.md](./API.md)

**Q: How is the system structured?**
A: Review [ARCHITECTURE.md](./ARCHITECTURE.md)

---

## 📞 Need Help?

- Check relevant guide above
- Review troubleshooting sections
- Check backend/frontend README files
- Open an issue on GitHub

---

**Choose a guide to get started →**
