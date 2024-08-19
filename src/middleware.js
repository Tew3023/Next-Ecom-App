import { NextResponse } from "next/server";
import { jwtVerify, importJWK } from "jose";

export async function middleware(request) {
  try {
    const SECRET_KEY = process.env.JWT_SECRET;

    if (!SECRET_KEY) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = request.cookies.get("token")?.value;
    if (!token) {
      throw new Error("No token found");
    }

    const secretJWK = { kty: "oct", k: SECRET_KEY };
    const secretKey = await importJWK(secretJWK, "HS256");
    const { payload } = await jwtVerify(token, secretKey);

    const requestHeader = new Headers(request.headers);
    requestHeader.set("user", JSON.stringify({ email: payload.email }));

    const response = NextResponse.next({
      request: {
        headers: requestHeader,
      },
    });

    return response;
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/test/:path*",
};
