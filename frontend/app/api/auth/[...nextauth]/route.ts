// NextAuth API route - placeholder for backend integration
// This will be configured when backend is set up
// Currently disabled as the app uses AuthContext for authentication

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { message: 'NextAuth route not configured yet' },
    { status: 501 }
  )
}

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { message: 'NextAuth route not configured yet' },
    { status: 501 }
  )
}






