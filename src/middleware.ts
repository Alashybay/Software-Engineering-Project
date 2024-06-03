import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { useSession } from "next-auth/react";
import { NextResponse } from "next/server"

const routes = [ "/posts" ,"/menu","/profile"];
const adminRoutes = ["/","/users",];

export default withAuth(
    function middleware(request: NextRequestWithAuth) {


        if (request.nextauth.token) {
            // If user is authenticated or accessing an unprotected route, continue with the request

            return NextResponse.next();
        } else {
            // If user is not authenticated and not accessing an unprotected route, redirect to login page
            return NextResponse.redirect("/signIn");
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)

export const config = {
    matcher:['/'],
    denyUnauthenticated: true
};
