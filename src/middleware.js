import { NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/signin', '/signup'];

export function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('token')?.value;

    // Acesso à raiz "/"
    if (pathname === '/') {
        if (token) {
            return NextResponse.redirect(new URL('/home', request.url));
        } else {
            return NextResponse.redirect(new URL('/signin', request.url));
        }
    }

    // Se estiver autenticado e for para login/signup, redireciona para home
    if (token && PUBLIC_PATHS.includes(pathname)) {
        return NextResponse.redirect(new URL('/home', request.url));
    }

    // Se não estiver autenticado e tentar acessar rota privada
    const isPublic = PUBLIC_PATHS.includes(pathname);
    if (!isPublic && !token) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|images|fonts|media|.*\\.svg$|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.webp$|.*\\.ico$).*)',
    ],
};
