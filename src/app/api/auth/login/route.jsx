import bcrypt from "bcrypt";
import { importJWK, SignJWT } from "jose";
import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongoDB";
import mongoose from "mongoose";

const SECRET_KEY = process.env.JWT_SECRET;

const TopicSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  role: String,
});

const Users = mongoose.models.Users || mongoose.model("Users", TopicSchema);

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    await connectMongoDB();

    const user = await Users.findOne({ email });
    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new NextResponse(JSON.stringify({ error: "Invalid password" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const secretJWK = { kty: "oct", k: SECRET_KEY };
    const secretKey = await importJWK(secretJWK, "HS256");
    const token = await new SignJWT({ email: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(secretKey);

    // Create a response object
    const response = NextResponse.redirect(
      user.role === "admin" ? new URL('/admin', request.url) : new URL('/', request.url)
    );

    // Set the cookie in the response
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    // Return the response
    return response;

  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
