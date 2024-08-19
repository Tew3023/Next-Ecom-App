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

    if (!firstname || !lastname || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await connectMongoDB();
    await Users.create({ firstname, lastname, email, password });
    return NextResponse.json({ message: "User Created" }, { status: 201 });

  } catch (error) {
    console.error("Error creating User:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const users = await Users.find();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// DELETE method to delete a user by ID
export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { message: "ID is required" },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const deletedUser = await Users.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting User:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
