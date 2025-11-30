# UrbanBuddy Frontend Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Set up Environment Variables**
   Create a `.env.local` file in the `frontend` directory:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-change-in-production
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Pages Created

### Public Pages
- `/` - Landing page with value props, how it works, cities, CTA
- `/search` - Search results with list and map view
- `/helpers/[id]` - Helper profile with portfolio, ratings, services, pricing
- `/how-it-works` - How the platform works
- `/cities` - Cities served
- `/about` - About us page
- `/careers` - Careers page

### Authentication
- `/login` - Sign in page
- `/register` - Sign up page (supports user/helper roles)
- `/forgot-password` - Password reset

### Booking & Payments
- `/book` - Task booking page with subscription requirement
- `/checkout` - Checkout and payment processing
- `/payments/subscribe` - Subscription plans
- `/payments/process` - Payment processing
- `/payments/confirm` - Payment confirmation

### Dashboards
- `/dashboard/user` - User dashboard (tasks, invoices, subscription)
- `/dashboard/helper` - Helper dashboard (inbox, earnings, KYC, profile)
- `/dashboard/admin` - Admin panel (users, helpers, tasks, disputes)

### Support & Legal
- `/support` - Help center with FAQs and contact form
- `/safety` - Safety tips and trust features
- `/terms` - Terms of Service
- `/privacy` - Privacy Policy
- `/refund` - Refund Policy
- `/contact` - Contact us page

## Key Features Implemented

### Trust & Safety
- KYC verification badges
- Escrow payment protection UI
- Rating and review system
- Dispute resolution workflow

### Subscription Model
- Three subscription tiers (Monthly, Quarterly, Yearly)
- Subscription requirement enforcement
- Subscription status tracking

### Payment Flow
- Escrow protection messaging
- Platform fee calculation
- Multiple payment methods UI
- Payment confirmation

### User Roles
- User role-based routing
- Helper-specific features
- Admin panel for platform management

## Components

### UI Components (`components/ui/`)
- Button
- Input
- Card
- Badge
- Select
- Textarea

### Layout Components
- Navbar (responsive with mobile menu)
- Footer (with all links)

## Next Steps for Backend Integration

1. **Configure NextAuth**
   - Update `app/api/auth/[...nextauth]/route.ts` with actual providers
   - Connect to backend authentication API
   - Set up session management

2. **API Integration**
   - Replace mock data with API calls
   - Set up API routes or connect to external backend
   - Implement real-time updates where needed

3. **Environment Variables**
   - Add backend API URL
   - Configure payment gateway keys
   - Set up map service tokens (Mapbox)

4. **File Uploads**
   - Implement KYC document upload
   - Add portfolio image uploads
   - Set up file storage integration

## Notes

- All pages are responsive and mobile-friendly
- Uses Tailwind CSS for styling
- TypeScript for type safety
- Next.js App Router for routing
- Mock data is used throughout - replace with API calls
- NextAuth is set up as placeholder - configure with backend







