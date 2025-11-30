// NextAuth configuration will be set up here
// This is a placeholder for the backend integration

export const authConfig = {
  pages: {
    signIn: '/login',
    signOut: '/',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }: any) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      const isOnAuthPage = nextUrl.pathname.startsWith('/login') || 
                          nextUrl.pathname.startsWith('/register')

      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      } else if (isLoggedIn && isOnAuthPage) {
        return Response.redirect(new URL('/dashboard', nextUrl))
      }
      return true
    },
  },
  providers: [], // Add providers (credentials, Google, etc.) when backend is ready
}

// Placeholder user session type
export interface UserSession {
  user: {
    id: string
    name: string
    email: string
    role: 'user' | 'helper' | 'admin'
    subscriptionStatus?: 'active' | 'expired' | 'cancelled'
  }
}






