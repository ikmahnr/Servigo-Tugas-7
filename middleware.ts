import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Kita izinkan semua lewat dulu supaya kamu bisa masuk halaman Admin
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'], 
}