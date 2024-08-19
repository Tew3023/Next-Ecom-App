import connectMongoDB from "@/lib/mongoDB";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  productName: { type: String },
  url: { type: String },
  price: { type: Number },
  type: { type: String },
  quantity: { type: Number },
  size: { type: Number },
  user: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  address: { type: String },
  phone: { type: String }, // Changed to string for better handling
  city: { type: String },
  province: { type: String },
  postalcode: { type: Number },
});

const Orders =
  mongoose.models.Orders || mongoose.model("Orders", orderSchema, "orders");

export async function POST(request) {
  try {
    const {
      productName,
      url,
      price,
      type,
      quantity,
      size,
      user,
      firstname,
      lastname,
      address,
      phone,
      city,
      province,
      postalcode,
    } = await request.json();

    // Basic validation
    if (
      !productName ||
      !url ||
      !price ||
      !type ||
      !quantity ||
      !size ||
      !user ||
      !firstname ||
      !lastname ||
      !address ||
      !phone ||
      !city ||
      !province ||
      !postalcode
    ) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const newOrder = await Orders.create({
      productName,
      url,
      price,
      type,
      quantity,
      size,
      user,
      firstname,
      lastname,
      address,
      phone,
      city,
      province,
      postalcode,
    });

    return NextResponse.json({ message: "Order created", order: newOrder }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error.message);
    return new NextResponse(
      JSON.stringify({ message: error.message || "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
