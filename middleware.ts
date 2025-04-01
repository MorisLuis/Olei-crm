import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const secretKey = new TextEncoder().encode('access_secret'); // Convertir a Uint8Array

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl; // Ruta actual
  const jwtCookie = req.cookies.get('token');
  const jwt = jwtCookie?.value;

  // Redirigir si ya está autenticado e intenta acceder a "/login"
  if (pathname === '/login' && jwt) {
    try {
      await jwtVerify(jwt, secretKey, { algorithms: ['HS256'] });
      return NextResponse.redirect(new URL('/dashboard', req.url));
    } catch (error) {
      console.error('Token inválido o expirado:', error);
    }
  }

  // Si no hay token y está accediendo a una ruta protegida
  if (pathname.startsWith('/dashboard')) {
    if (!jwt) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      await jwtVerify(jwt, secretKey, { algorithms: ['HS256'] });
      return NextResponse.next();
    } catch (error) {
      console.error('Token inválido o expirado:', error);
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'], // Aplicar middleware a estas rutas
};
