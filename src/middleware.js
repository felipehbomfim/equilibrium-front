// middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const PUBLIC_PATHS = ["/signin", "/signup"];

export async function middleware(request) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = request.nextUrl;

    // Rota raiz "/"
    if (pathname === "/") {
        if (token) {
            return NextResponse.redirect(new URL("/home", request.url));
        } else {
            return NextResponse.redirect(new URL("/signin", request.url));
        }
    }

    if (token && PUBLIC_PATHS.includes(pathname)) {
        return NextResponse.redirect(new URL("/home", request.url));
    }

    const isPublic = PUBLIC_PATHS.includes(pathname);
    if (!isPublic && !token) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"],
};
