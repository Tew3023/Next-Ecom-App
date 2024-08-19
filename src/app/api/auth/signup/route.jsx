import bcrypt from 'bcrypt';
import connectMongoDB from "@/lib/mongoDB";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
}, {
  timestamps: true
});

const Users = mongoose.models.Users || mongoose.model("Users", TopicSchema);

export async function POST(request) {
  try {
    const { firstname, lastname, email, password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await Users.create({ firstname, lastname, email, password: hashedPassword });
    
    return new Response(JSON.stringify({ message: 'Registered successfully' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
