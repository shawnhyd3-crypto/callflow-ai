import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    authorized({ token, req }) {
      const path = req.nextUrl.pathname
      if (!token) return false

      if (path.startsWith('/admin')) {
        return token.role === 'admin'
      }

      return true
    },
  },
})

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
}
