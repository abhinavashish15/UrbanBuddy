# Frontend-Backend Connection Guide

## ✅ Setup Complete

The frontend and backend are now fully connected! Here's what has been implemented:

## 🔧 What's Been Done

### 1. **API Client Layer** (`frontend/lib/api.ts`)
   - Centralized API client with authentication
   - Automatic token management (localStorage)
   - Error handling and response formatting

### 2. **API Services** (`frontend/lib/api/`)
   - `auth.ts` - Authentication (register, login, getCurrentUser)
   - `users.ts` - User management
   - `helpers.ts` - Helper profiles and search
   - `tasks.ts` - Task management
   - `reviews.ts` - Review system
   - `payments.ts` - Payment and subscription handling

### 3. **Authentication Context** (`frontend/contexts/AuthContext.tsx`)
   - Global auth state management
   - Login/register/logout functions
   - Automatic token refresh
   - User session persistence

### 4. **Updated Pages**
   - ✅ Login page - Now uses backend API
   - ✅ Register page - Now uses backend API
   - ✅ Navbar - Shows user state and logout

### 5. **Environment Variables**
   - Created `.env.example` template
   - API URL configured: `http://localhost:8000/api`

## 🚀 How to Run

### Backend Setup
1. **Navigate to backend:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up `.env` file:**
   ```env
   PORT=8000
   NODE_ENV=development
   DATABASE_URL=mongodb://localhost:27017/urbanbuddy
   JWT_SECRET=your-secret-key-here
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start backend:**
   ```bash
   npm run dev
   ```

### Frontend Setup
1. **Navigate to frontend:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env.local` file:**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-change-in-production
   ```

4. **Start frontend:**
   ```bash
   npm run dev
   ```

## 🔌 API Endpoints

All endpoints are prefixed with `/api`:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Users
- `GET /api/users` - Get current user (protected)
- `PUT /api/users` - Update user (protected)
- `POST /api/users/change-password` - Change password (protected)
- `GET /api/users/tasks/all` - Get user tasks (protected)
- `GET /api/users/payments/all` - Get user payments (protected)

### Helpers
- `GET /api/helpers/search` - Search helpers (public)
- `GET /api/helpers/:id` - Get helper by ID (public)
- `GET /api/helpers/profile/me` - Get my helper profile (protected, helper only)
- `PUT /api/helpers/profile/me` - Update helper profile (protected, helper only)
- `POST /api/helpers/kyc/upload` - Upload KYC documents (protected, helper only)
- `PUT /api/helpers/portfolio` - Update portfolio (protected, helper only)
- `GET /api/helpers/tasks/my` - Get my tasks (protected, helper only)
- `GET /api/helpers/earnings/my` - Get my earnings (protected, helper only)

### Tasks
- `GET /api/tasks/search` - Search tasks (public)
- `GET /api/tasks/:id` - Get task by ID (public)
- `POST /api/tasks` - Create task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `POST /api/tasks/:id/accept` - Accept task (protected, helper only)
- `PATCH /api/tasks/:id/status` - Update task status (protected)

### Reviews
- `POST /api/reviews/task/:taskId` - Create review (protected)
- `GET /api/reviews/helper/:helperId` - Get helper reviews (public)
- `GET /api/reviews/task/:taskId` - Get task reviews (public)

### Payments
- `POST /api/payments/subscription` - Create subscription (protected)
- `POST /api/payments/task/:taskId` - Create task payment (protected)
- `POST /api/payments/task/:taskId/release` - Release escrow (protected)
- `GET /api/payments/:id` - Get payment by ID (protected)
- `GET /api/payments/subscriptions/all` - Get user subscriptions (protected)
- `GET /api/payments/subscription/active` - Get active subscription (protected)

## 🔐 Authentication Flow

1. **Register/Login:**
   - User submits credentials
   - Backend validates and returns JWT token
   - Token stored in localStorage
   - User data stored in AuthContext

2. **Protected Routes:**
   - Token automatically included in Authorization header
   - Backend validates token via middleware
   - If invalid, user redirected to login

3. **Logout:**
   - Token removed from localStorage
   - AuthContext cleared
   - User redirected to home

## 📝 Usage Examples

### Using Auth Context
```tsx
import { useAuth } from '@/contexts/AuthContext'

function MyComponent() {
  const { user, login, logout, loading } = useAuth()
  
  if (loading) return <div>Loading...</div>
  if (!user) return <div>Please login</div>
  
  return <div>Welcome, {user.name}!</div>
}
```

### Making API Calls
```tsx
import { helpersApi } from '@/lib/api/helpers'

// Search helpers
const response = await helpersApi.searchHelpers({
  city: 'Mumbai',
  minRating: 4.5
})

if (response.success) {
  console.log(response.data.helpers)
}
```

## ⚠️ Important Notes

1. **CORS:** Backend is configured to accept requests from `http://localhost:3000`
2. **Token Storage:** Tokens are stored in localStorage (consider httpOnly cookies for production)
3. **Error Handling:** All API calls return `{ success: boolean, data?: T, error?: string }`
4. **Type Safety:** All API responses are typed with TypeScript

## 🐛 Troubleshooting

### Backend not connecting?
- Check backend is running on port 8000
- Verify `DATABASE_URL` in backend `.env`
- Check MongoDB is running

### Frontend can't reach backend?
- Verify `NEXT_PUBLIC_API_URL` in frontend `.env.local`
- Check CORS settings in backend
- Ensure both servers are running

### Authentication issues?
- Check JWT_SECRET is set in backend
- Verify token is being stored in localStorage
- Check browser console for errors

## 🎯 Next Steps

1. Update remaining pages to use API:
   - Search page
   - Helper profile page
   - Dashboard pages
   - Booking pages

2. Add error handling UI
3. Add loading states
4. Implement refresh token logic
5. Add request interceptors for token refresh

