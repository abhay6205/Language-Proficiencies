# 🚀 Quick Start - 5 Minutes

Get Polyglot Pro running in just 5 minutes!

## ⚡ TL;DR

```bash
git clone <repo>
cd polyglot-pro
npm run install-all
npm run dev
```

Then open:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

---

## 📋 Prerequisites

- Node.js 16+ ([Download](https://nodejs.org))
- PostgreSQL 12+ ([Download](https://www.postgresql.org/download))
- npm or yarn

## ✅ Installation Steps

### 1️⃣ Clone Repository
```bash
git clone <repository-url>
cd polyglot-pro
```

### 2️⃣ Install Dependencies
```bash
npm run install-all
```

### 3️⃣ Configure Environment

Create `.env` files:

**Backend** (`backend/.env`):
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=polyglot_pro
DB_USER=postgres
DB_PASSWORD=password
JWT_SECRET=dev_secret_key_change_in_production
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

### 4️⃣ Setup Database
```bash
cd backend
npx sequelize-cli db:create
npx sequelize-cli db:migrate
cd ..
```

### 5️⃣ Start Development
```bash
npm run dev
```

---

## 🌐 Access Your App

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:5000 |
| API | http://localhost:5000/api |
| Health Check | http://localhost:5000/health |

---

## 🧪 Test It

### Test Frontend
Open http://localhost:5173 in browser

### Test Backend
```bash
curl http://localhost:5000/health
```

Response:
```json
{"status":"OK","timestamp":"2024-06-07T..."}
```

### Test API
```bash
curl http://localhost:5000/api/courses
```

---

## 🐳 Using Docker

Skip manual setup with Docker:

```bash
docker-compose up -d
```

Access same URLs as above.

---

## 📁 Project Layout

```
polyglot-pro/
├── frontend/       → React app (port 5173)
├── backend/        → Express API (port 5000)
├── docs/          → Documentation
├── docker-compose.yml
└── README.md
```

---

## 🔧 Common Commands

```bash
# Development
npm run dev              # Start all servers

# Build
npm run build            # Build for production

# Database
npm run db:create        # Create database
npm run db:migrate       # Run migrations
npm run db:seed          # Seed test data

# Docker
docker-compose up -d     # Start containers
docker-compose down      # Stop containers
```

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| **Port 5000 in use** | `lsof -i :5000` then kill process |
| **Database error** | Check PostgreSQL is running |
| **Dependencies error** | `npm cache clean --force && npm install` |
| **Can't connect to API** | Check `VITE_API_URL` in `.env` |

---

## 📝 Next Steps

1. ✅ App is running!
2. 📖 Read [SETUP.md](./SETUP.md) for detailed info
3. 🏗️ Check [ARCHITECTURE.md](./ARCHITECTURE.md) to understand structure
4. 🔌 Explore [API.md](./API.md) for endpoints
5. 🚀 When ready, see [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🎉 You're Ready!

Start building with Polyglot Pro. Happy coding! 🚀

---

**Need more help?** Check other guides in `/docs`
