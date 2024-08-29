import connectMongoDB from "@/lib/mongoDB";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema(
  {
    name: String,
    url: String,
    price: String,
    collection: String,
    stock_quantity: Number,
  },
  {
    timestamps: true,
  }
);

const Shoes =
  mongoose.models.Shoes ||
  mongoose.model("Shoes", CollectionSchema, "shoesCollection");

export async function GET() {
  try {
    await connectMongoDB();
    const shoes = await Shoes.find();
    return NextResponse.json({ shoes }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    if (!id) throw new Error("Product ID is required for deletion");
    await connectMongoDB();
    const deletedProduct = await Shoes.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { id, name, price, stock_quantity, collection } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "Product ID is required for updating" },
        { status: 400 }
      );
    }
    await connectMongoDB();
    const updatedProduct = await Shoes.findByIdAndUpdate(
      id,
      { name, price, stock_quantity, collection },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Product updated", product: updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
