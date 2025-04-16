import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  redirects: async () => [
    {
      source: '/',
      destination: '/login',
      permanent: false, // Use false if this might change based on auth
    },
  ],
  
  matcher: ['/((?!_next|favicon.ico|api/public).*)'],
}

export default nextConfig
