import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = process.env.JWT_SECRET || "s3Cr3t";

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl; // Ruta actual
    const jwtCookie = req.cookies.get("token");
    const jwt = jwtCookie?.value;

    // Redirigir si ya está autenticado e intenta acceder a "/login"
    if (pathname === "/login" && jwt) {
        try {
            await jwtVerify(jwt, new TextEncoder().encode(SECRET_KEY));
            return NextResponse.redirect(new URL("/dashboard", req.url));
        } catch (error) {
            console.error("Token inválido o expirado:", error);
        }
    }

    // Si no hay token y está accediendo a una ruta protegida
    if (pathname.startsWith("/dashboard")) {
        if (!jwt) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        try {
            await jwtVerify(jwt, new TextEncoder().encode(SECRET_KEY));
            return NextResponse.next();
        } catch (error) {
            console.error("Token inválido o expirado:", error);
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/login"], // Aplicar middleware a estas rutas
};
