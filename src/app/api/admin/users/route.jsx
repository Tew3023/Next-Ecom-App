import connectMongoDB from "@/lib/mongoDB";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

const UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    role: String,
});

const Users = mongoose.models.Users || mongoose.model("Users", UserSchema);

export async function GET() {
  try {
    await connectMongoDB();
    const users = await Users.find(); 
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    if (!id) throw new Error("User ID is required for deletion");

    await connectMongoDB();
    const deletedUser = await Users.findByIdAndDelete(id);

    if (!deletedUser) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


export async function PUT(request) {
  try {
    const { id, firstname, lastname, email } = await request.json();
    
    if (!id) {
      return new NextResponse(JSON.stringify({ message: "User ID is required for updating" }), {
        status: 400, 
        headers: { "Content-Type": "application/json" },
      });
    }
    await connectMongoDB();
    const updatedUser = await Users.findByIdAndUpdate(
      id,
      { firstname, lastname, email }, 
      { new: true }
    );
    
    if (!updatedUser) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404, // Not Found
        headers: { "Content-Type": "application/json" },
      });
    }
    return NextResponse.json({ message: "User updated", user: updatedUser }, { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500, 
      headers: { "Content-Type": "application/json" },
    });
  }
}
  
