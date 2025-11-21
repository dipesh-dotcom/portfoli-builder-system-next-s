// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
// import { authConfig } from "./auth.config";

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // Check if route is protected
//   const isProtected = authConfig.protectedRoutes.some((route) =>
//     pathname.startsWith(route)
//   );

//   if (!isProtected) return NextResponse.next();

//   // getToken works in Edge Runtime
//   const token = await getToken({
//     req,
//     secret: process.env.NEXTAUTH_SECRET,
//   });

//   if (!token) {
//     const loginUrl = req.nextUrl.clone();
//     loginUrl.pathname = "/sign-in";
//     loginUrl.searchParams.set("callbackUrl", pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: /admin/:path*"],
// };
