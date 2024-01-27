import { NextResponse } from 'next/server';
import type {NextRequest} from "next/server";
import {createClient} from "@/utils/supabase/middleware";

export default async function middleware(request:NextRequest) {

  const {supabase} = createClient(request)
  const {data:{session}} = await supabase.auth.getSession()
  const { pathname } = request.nextUrl;

  // Bypass middleware for the homepage
  if (['/','/login','/logout','/signup'].includes(pathname)) {
    return NextResponse.next();
  }

  if(session?.user.aud!=="authenticated")
    return NextResponse.redirect(new URL('/login', request.url));

}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};