import connectMongoDB from "@/lib/mongoDB";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema({
  name: String,            
  url: String,          
  price: String,           
  collection: String,      
  stock_quantity: Number,  
}, {
  timestamps: true  
});

const Shoes = mongoose.models.Shoes || mongoose.model("Shoes", CollectionSchema, "shoesCollection");

export async function GET() {
  try {
    await connectMongoDB();
    const shoes = await Shoes.find();
    console.log("Retrieved shoes:", shoes);  
    return NextResponse.json({ shoes }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
