import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    try {
        const { amount } = await request.json();
        const payment = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return NextResponse.json({ clientSecret: payment.client_secret });
    } catch (error) {
        console.error("Error creating payment intent:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}

