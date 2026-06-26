# Frontend - Polyglot Pro

React 18 + Vite language learning application.

## 📁 Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page components
│   ├── services/           # API communication
│   ├── slices/             # Redux state slices
│   ├── context/            # React Context
│   ├── hooks/              # Custom hooks
│   ├── styles/             # Global styles
│   ├── utils/              # Utility functions
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── store.js            # Redux store
├── public/                 # Static assets
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
├── .env.example            # Environment template
├── package.json            # Dependencies
└── README.md               # This file
```

## 🚀 Quick Start

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Available Scripts

```bash
npm run dev       # Start development server (port 5173)
npm run build     # Build optimized production bundle
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
npm run lint:fix  # Fix ESLint issues
```

## 📦 Key Dependencies

- **React 18** - UI framework
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **React Hot Toast** - Notifications

## 🔧 Configuration

### Environment Variables

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

### Vite Config

Configured with:
- React Fast Refresh
- API proxy for development
- Tailwind CSS
- ESLint

## 📄 Pages

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Landing page |
| Courses | `/courses` | Course catalog |
| Course Detail | `/courses/:id` | Individual course |
| Login | `/login` | User login |
| Register | `/register` | User registration |
| Dashboard | `/dashboard` | Learning dashboard |
| Lesson | `/lesson/:id` | Lesson player |
| Profile | `/profile` | User profile |

## 🧩 Components

- **Navigation** - Main app navigation
- **Footer** - Footer section
- **PrivateRoute** - Protected routes

## 🛠️ Development Tips

### Adding a New Page

1. Create component in `src/pages/`
2. Add route in `App.jsx`
3. Add navigation link

### Adding a Component

1. Create in `src/components/`
2. Use in pages or other components
3. Maintain reusability

### API Integration

Use services in `src/services/`:

```js
import { courseService } from '../services'

const courses = await courseService.getAllCourses()
```

## 🔐 Authentication

Implemented with Redux + Context:
- JWT tokens stored in localStorage
- Protected routes with PrivateRoute
- Automatic logout on token expiry

## 🎨 Styling

- **Tailwind CSS** - Utility-first CSS
- **Global styles** in `src/styles/global.css`
- **Responsive design** mobile-first
- **Color scheme** in `tailwind.config.js`

## 🧪 Building & Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

## 📱 Responsive Breakpoints

- **Mobile** - < 640px
- **Tablet** - 640px - 1024px
- **Desktop** - > 1024px

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port in use | Change in `vite.config.js` |
| CORS error | Check `VITE_API_URL` |
| Styling issues | Clear cache: `npm run build && rm -rf dist` |

---

For backend info, see [Backend README](../backend/README.md)
For full docs, see [Documentation](../docs/README.md)
