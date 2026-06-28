# Contributing to Polyglot Pro

We're excited that you want to contribute to Polyglot Pro! This document provides guidelines and instructions for contributing.

## 📋 Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Setup](#development-setup)
4. [Making Changes](#making-changes)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Coding Standards](#coding-standards)
8. [Testing](#testing)

---

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

---

## Getting Started

### Prerequisites

- Node.js 16+
- PostgreSQL 12+
- Git
- A GitHub account

### Fork the Repository

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/polyglot-pro.git
   cd polyglot-pro
   ```

3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/polyglot-pro.git
   ```

---

## Development Setup

### 1. Install Dependencies

```bash
npm run install-all
```

### 2. Create Environment Files

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

### 3. Setup Database

```bash
cd backend
npx sequelize-cli db:create
npx sequelize-cli db:migrate
cd ..
```

### 4. Start Development

```bash
npm run dev
```

---

## Making Changes

### Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# OR for bug fixes
git checkout -b fix/bug-description
```

**Branch naming conventions:**
- `feature/` - For new features
- `fix/` - For bug fixes
- `docs/` - For documentation updates
- `refactor/` - For code refactoring
- `test/` - For test additions

### Keep Your Branch Updated

```bash
git fetch upstream
git rebase upstream/main
```

---

## Commit Guidelines

### Commit Messages

Write clear, descriptive commit messages:

```bash
git commit -m "feat: add user profile page

- Add profile component
- Add profile service API calls
- Add profile form validation
- Add profile routing"
```

### Commit Format

```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting (no code changes)
- `refactor:` - Code refactoring
- `test:` - Test additions/updates
- `chore:` - Build/dependency updates

**Subject:**
- Use imperative mood ("add" not "adds")
- Max 50 characters
- Don't capitalize
- No period at end

---

## Pull Request Process

### Before Submitting

1. **Update from upstream:**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests:**
   ```bash
   npm test
   ```

3. **Build check:**
   ```bash
   npm run build
   ```

### Submit Pull Request

1. Push to your fork:
   ```bash
   git push origin your-branch-name
   ```

2. Go to GitHub and create a Pull Request

3. Fill in the PR template:
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation

   ## How to Test
   Steps to verify the changes

   ## Checklist
   - [ ] Tests pass
   - [ ] Code follows style guidelines
   - [ ] Documentation updated
   - [ ] No new warnings generated
   ```

### PR Review Process

- Maintainers will review your PR
- Request changes may be needed
- Once approved, your PR will be merged

---

## Coding Standards

### Frontend (React/JavaScript)

```javascript
// Use functional components
const MyComponent = ({ prop }) => {
  return <div>{prop}</div>;
};

// Use meaningful names
const getUserProfile = async (userId) => {
  // implementation
};

// Proper formatting
const handleClick = () => {
  // code
};
```

**ESLint Configuration:**
- Run: `npm run lint:fix`
- Follows Airbnb style guide

### Backend (Node.js/JavaScript)

```javascript
// Use async/await
const getUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    throw error;
  }
};

// Error handling
router.post('/route', async (req, res, next) => {
  try {
    // implementation
  } catch (error) {
    next(error);
  }
});
```

**Code Standards:**
- Meaningful variable names
- Comments for complex logic
- Consistent indentation (2 spaces)
- No console.log in production

### CSS/Tailwind

```jsx
// Use Tailwind utility classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  <h1 className="text-2xl font-bold text-gray-900">Title</h1>
</div>

// Use CSS modules for complex styles
import styles from './Component.module.css';
<div className={styles.container}>
```

---

## Testing

### Writing Tests

```javascript
// Backend (Jest)
describe('User Model', () => {
  test('should hash password before saving', async () => {
    const user = await User.create({
      name: 'John',
      email: 'john@example.com',
      password: 'password123'
    });
    expect(user.password).not.toBe('password123');
  });
});

// Frontend (Vitest/React Testing Library)
test('renders login form', () => {
  render(<LoginPage />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
});
```

### Run Tests

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

---

## Documentation

### Update Documentation When:
- Adding new features
- Changing API endpoints
- Modifying database schema
- Adding configuration options

### Documentation Files to Update:
- [docs/API.md](./docs/API.md) - API endpoints
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) - System design
- [README.md](./README.md) - Overview
- Component/File comments

---

## Common Tasks

### Add New API Endpoint

1. Create route in `backend/src/routes/`
2. Add model if needed in `backend/src/models/`
3. Update `docs/API.md`
4. Add tests
5. Submit PR

### Add New Frontend Page

1. Create component in `frontend/src/pages/`
2. Add route in `frontend/src/App.jsx`
3. Create API service if needed
4. Add Redux slice if needed
5. Add tests
6. Submit PR

### Update Database

1. Create migration:
   ```bash
   cd backend
   npx sequelize-cli migration:generate --name description
   ```
2. Update model
3. Update tests
4. Update documentation

---

## Getting Help

- Check [GitHub Issues](https://github.com/your-repo/issues)
- Review [existing discussions](https://github.com/your-repo/discussions)
- Read [documentation](./docs)
- Ask in PR comments

---

## Recognition

Contributors will be:
- Added to CONTRIBUTORS.md
- Recognized in release notes
- Featured in project documentation

---

## Questions?

Feel free to:
- Open an issue
- Start a discussion
- Comment on PRs
- Email maintainers

---

**Thank you for contributing to Polyglot Pro! 🎉**
