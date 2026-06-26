# Deployment Guide - Polyglot Pro

## Table of Contents

1. [Local Development](#local-development)
2. [Docker Deployment](#docker-deployment)
3. [Heroku Deployment](#heroku-deployment)
4. [Vercel/Netlify Deployment](#verc-netlify-deployment)
5. [AWS Deployment](#aws-deployment)
6. [Production Checklist](#production-checklist)

---

## Local Development

### System Requirements
- Node.js 16+ LTS
- PostgreSQL 12+
- npm or yarn
- Git

### Setup Steps

```bash
# 1. Clone repository
git clone <repository-url>
cd polyglot-pro

# 2. Install dependencies
npm run install-all

# 3. Create environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 4. Configure environment variables
nano backend/.env      # Edit backend configuration
nano frontend/.env     # Edit frontend configuration

# 5. Create database
cd backend
npx sequelize-cli db:create

# 6. Run migrations
npx sequelize-cli db:migrate

# 7. Seed initial data (optional)
npx sequelize-cli db:seed:all

# 8. Start development servers
cd ..
npm run dev
```

### Development URLs
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- API: http://localhost:5000/api

---

## Docker Deployment

### Prerequisites
- Docker 20.10+
- Docker Compose 1.29+

### Quick Start

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Clean up volumes
docker-compose down -v
```

### Environment Variables

Create `.env` files in both `frontend/` and `backend/` directories:

**backend/.env:**
```env
PORT=5000
NODE_ENV=development
DB_HOST=postgres
DB_PORT=5432
DB_NAME=polyglot_pro
DB_USER=postgres
DB_PASSWORD=password
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=sk_test_xxx
```

**frontend/.env:**
```env
VITE_API_URL=http://localhost:5000/api
```

### Accessing Services

After Docker Compose starts:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- PostgreSQL: localhost:5432

---

## Heroku Deployment

### Backend Deployment

#### 1. Create Heroku App

```bash
# Login to Heroku
heroku login

# Create app
heroku create polyglot-pro-api

# Create PostgreSQL database
heroku addons:create heroku-postgresql:hobby-dev --app polyglot-pro-api
```

#### 2. Set Environment Variables

```bash
heroku config:set --app polyglot-pro-api \
  NODE_ENV=production \
  JWT_SECRET=$(openssl rand -hex 32) \
  STRIPE_SECRET_KEY=sk_live_xxx \
  FRONTEND_URL=https://yourdomain.com
```

#### 3. Deploy

```bash
# Add Heroku remote
heroku git:remote --app polyglot-pro-api

# Deploy
git push heroku main

# Run migrations
heroku run npm run migrate --app polyglot-pro-api

# View logs
heroku logs --tail --app polyglot-pro-api
```

### Frontend Deployment (Vercel/Netlify)

See Vercel section below.

---

## Vercel/Netlify Deployment

### Vercel (Recommended for React)

#### 1. Install Vercel CLI

```bash
npm i -g vercel
```

#### 2. Deploy Frontend

```bash
cd frontend

# Login
vercel login

# Deploy
vercel

# Production deployment
vercel --prod
```

#### 3. Configure Environment Variables

In Vercel dashboard:
```
VITE_API_URL=https://your-api-domain.com/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
```

#### 4. Custom Domain (Optional)

```bash
vercel domains add your-domain.com
```

### Netlify

#### 1. Connect Repository

- Go to https://app.netlify.com
- Click "New site from Git"
- Select your repository
- Click "Deploy"

#### 2. Build Settings

- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `dist`

#### 3. Environment Variables

In Netlify settings:
```
VITE_API_URL=https://your-api-domain.com/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
```

---

## AWS Deployment

### RDS PostgreSQL Setup

```bash
# Create RDS instance via AWS Console
# or using AWS CLI:
aws rds create-db-instance \
  --db-instance-identifier polyglot-pro \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --allocated-storage 20
```

### EC2 Backend Deployment

```bash
# 1. Connect to EC2 instance
ssh -i your-key.pem ec2-user@your-instance-ip

# 2. Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# 3. Install PostgreSQL client
sudo yum install -y postgresql

# 4. Clone repository
git clone <repository-url>
cd polyglot-pro/backend

# 5. Install dependencies
npm install

# 6. Configure environment
cp .env.example .env
# Edit .env with RDS endpoint and credentials

# 7. Run migrations
npx sequelize-cli db:migrate

# 8. Start application
pm2 start src/index.js --name "polyglot-api"
```

### S3 Frontend Deployment

```bash
# Build frontend
cd frontend
npm run build

# Create S3 bucket
aws s3 mb s3://polyglot-pro-frontend

# Upload build files
aws s3 sync dist/ s3://polyglot-pro-frontend/

# Enable static website hosting
aws s3 website s3://polyglot-pro-frontend \
  --index-document index.html \
  --error-document index.html
```

### CloudFront CDN

```bash
# Create CloudFront distribution pointing to S3 bucket
# Use AWS Console or CloudFormation template
```

---

## Production Checklist

### Security
- [ ] Set strong `JWT_SECRET`
- [ ] Enable HTTPS/SSL certificates
- [ ] Configure CORS properly
- [ ] Use environment variables for sensitive data
- [ ] Enable rate limiting
- [ ] Setup CSRF protection
- [ ] Use security headers (Helmet.js)
- [ ] Implement input validation

### Database
- [ ] Use strong database passwords
- [ ] Enable SSL connection
- [ ] Configure automated backups
- [ ] Monitor database performance
- [ ] Setup connection pooling

### Backend
- [ ] Set `NODE_ENV=production`
- [ ] Enable compression
- [ ] Setup proper logging
- [ ] Configure error tracking (Sentry)
- [ ] Enable CORS with specific origins
- [ ] Setup monitoring and alerts

### Frontend
- [ ] Optimize build size
- [ ] Enable caching strategies
- [ ] Setup analytics
- [ ] Configure error tracking
- [ ] Test all features
- [ ] Optimize images

### Monitoring & Logging
- [ ] Setup error tracking (Sentry, LogRocket)
- [ ] Configure performance monitoring
- [ ] Setup uptime monitoring
- [ ] Enable database backups
- [ ] Configure log aggregation

### Testing
- [ ] Run full test suite
- [ ] Test payment flow
- [ ] Test authentication
- [ ] Test database migrations
- [ ] Load testing

---

## Environment Variables Reference

### Backend Production
```env
NODE_ENV=production
PORT=5000

DB_HOST=your-rds-endpoint.rds.amazonaws.com
DB_PORT=5432
DB_NAME=polyglot_pro
DB_USER=admin
DB_PASSWORD=<strong-password>

JWT_SECRET=<32-character-random-string>
JWT_EXPIRE=7d

STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx

SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=<sendgrid-api-key>

FRONTEND_URL=https://yourdomain.com
```

### Frontend Production
```env
VITE_API_URL=https://api.yourdomain.com/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
```

---

## Monitoring & Maintenance

### Logs

```bash
# Heroku
heroku logs --tail

# Docker
docker-compose logs -f backend

# AWS EC2
tail -f /var/log/application.log
```

### Database Backups

```bash
# PostgreSQL backup
pg_dump -U postgres polyglot_pro > backup.sql

# Restore from backup
psql -U postgres polyglot_pro < backup.sql
```

### Performance Monitoring

- Setup New Relic or DataDog
- Monitor database queries
- Track API response times
- Monitor error rates

---

## Troubleshooting

### Database Connection Issues
```bash
# Test connection
psql -h <host> -U <user> -d <database>

# Check environment variables
heroku config --app polyglot-pro-api
```

### Build Failures
```bash
# Clear cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Memory Issues
```bash
# Increase heap size for Node.js
export NODE_OPTIONS="--max-old-space-size=2048"
npm start
```

---

## Support

For deployment issues, refer to:
- [Heroku Documentation](https://devcenter.heroku.com)
- [Vercel Documentation](https://vercel.com/docs)
- [AWS Documentation](https://docs.aws.amazon.com)
- [Docker Documentation](https://docs.docker.com)

---

**Last Updated:** June 2024
