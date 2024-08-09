import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
const myMiddleware = async (req) => {
    try {
        const path = req.nextUrl.pathname;

        const token = req.cookies.get("token")?.value || "";
        const isPublicPath = path === "/login" || path === "/signup";

        if (isPublicPath && token) {
            return NextResponse.redirect(new URL("/profile", req.url));
        }
        if (!token && !isPublicPath) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    } catch (error) {
        console.log("Middleware error:", error)
    }
}
export async function middleware(req) {
    return myMiddleware(req)
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/",
        "/signup",
        "/login",
        "/profile"
    ]
}