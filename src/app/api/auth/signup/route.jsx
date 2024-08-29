import bcrypt from "bcrypt";
import connectMongoDB from "@/lib/mongoDB";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    role: String , 
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.models.Users || mongoose.model("Users", TopicSchema);

export async function POST(request) {
  try {
    const { firstname, lastname, email, password } = await request.json();
    await connectMongoDB();

    const existingUser = await Users.findOne({ email: email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 } 
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await Users.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role: "user",
    });

    return NextResponse.json(
      { message: "Registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
