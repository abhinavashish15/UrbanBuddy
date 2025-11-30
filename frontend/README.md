# UrbanBuddy Frontend

A Next.js frontend application for UrbanBuddy - a platform connecting people moving to new cities with verified local helpers.

## Features

- **Landing Page** - Value propositions, how it works, cities served, and CTAs
- **Search & Discovery** - List and map views for finding verified helpers
- **Helper Profiles** - Detailed profiles with portfolio, ratings, services, and pricing
- **Booking System** - Task creation, checkout flow with subscription requirements
- **Payment Pages** - Subscription management and task payment processing
- **User Dashboard** - Manage tasks, invoices, and subscription status
- **Helper Dashboard** - Request inbox, earnings, payouts, profile editing, and KYC upload
- **Admin Panel** - Manage users, helpers, tasks, and disputes
- **Authentication** - Sign up, login, and password reset flows
- **Support Center** - Help center, T&C, Privacy Policy, and Safety tips

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **NextAuth** (for authentication - to be configured with backend)
- **Lucide React** (icons)
- **Radix UI** (accessible component primitives)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── layout.tsx         # Root layout
│   ├── search/            # Search results
│   ├── helpers/[id]/      # Helper profile pages
│   ├── book/              # Booking flow
│   ├── checkout/          # Checkout page
│   ├── payments/          # Payment pages
│   ├── dashboard/         # User, helper, and admin dashboards
│   ├── login/             # Authentication pages
│   ├── register/
│   ├── forgot-password/
│   ├── terms/             # Support pages
│   ├── privacy/
│   ├── safety/
│   └── support/
├── components/            # Reusable components
│   ├── ui/               # UI primitives
│   ├── navbar.tsx
│   └── footer.tsx
├── lib/                  # Utilities and helpers
│   ├── utils.ts
│   ├── constants.ts
│   └── auth.ts
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## Key Features Implementation

### Trust & Safety
- KYC verification badges for helpers
- Escrow payment protection
- Rating and review system
- Dispute resolution workflow

### Subscription Model
- Monthly, Quarterly, and Yearly plans
- Subscription requirement for booking
- Subscription status tracking in dashboard

### Payment Flow
- Escrow protection for task payments
- Platform fee calculation
- Multiple payment methods (Card, UPI, Wallet)
- Payment confirmation and receipts

### User Roles
- **Users**: Book helpers, manage tasks, track subscriptions
- **Helpers**: Accept requests, manage earnings, KYC upload
- **Admin**: Manage platform, users, helpers, disputes

## Backend Integration

The frontend is designed to work with a backend API. Key integration points:

- Authentication endpoints (NextAuth configuration)
- User and helper data fetching
- Task creation and management
- Payment processing
- KYC document upload
- Dispute management

Update API endpoints in components when backend is ready.

## Environment Variables

Create a `.env.local` file:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-change-in-production
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Notes

- Currently uses mock data for demonstration
- NextAuth configuration placeholder ready for backend integration
- All pages are responsive and mobile-friendly
- UI components follow accessibility best practices






