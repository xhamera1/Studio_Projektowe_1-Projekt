# Health Prediction Frontend

A React application for health prediction services built with TypeScript and
Vite.

## Prerequisites

- Node.js v18 or higher
- npm or yarn

## Environment Configuration

The application requires environment files to configure the backend API URL.

### Setup for Development

Create a `.env.development` file in the `frontend/` directory:

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_ENV=development
VITE_ENABLE_DEBUG=true
```

### Setup for Production

Create a `.env.production` file in the `frontend/` directory:

```env
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_ENV=production
VITE_ENABLE_DEBUG=false
```

## Available Scripts

| Script               | Description               |
|----------------------|---------------------------|
| `npm install`        | Install dependencies      |
| `npm run dev`        | Start development server  |
| `npm run build`      | Build for production      |
| `npm run build:dev`  | Build for development     |
| `npm run build:prod` | Build for production      |
| `npm run preview`    | Preview production build  |
| `npm run lint`       | Run ESLint                |
| `npm run format`     | Format code with Prettier |

## Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable UI components
│   ├── config/         # Configuration (API endpoints)
│   ├── contexts/       # React context providers
│   ├── pages/          # Page components
│   ├── routes/         # Route configurations
│   └── utils/          # Utility functions and types
├── .env.development    # Development environment variables
├── .env.production     # Production environment variables
└── .env.example        # Environment template
```

## Technology Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Material-UI** - Component library
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
