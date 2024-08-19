"use client";
import React, { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Axios from "axios";
import convertToSubcurrency from "@/lib/connvertToSubcurrency";

export default function Checkoutform({ amount, userdata }) {
  console.log("userdata : ", userdata);
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCart(JSON.parse(storedCartItems));
    }
  }, []);

  const addDataToDataBase = async () => {
    try {
      console.log("Payment successful, proceeding with order creation...");
      await Promise.all(
        cart.map(async (item) => {
          try {
            const res = await Axios.post("/api/order", {
              productName: item.name,
              url: item.url,
              price: item.price,
              type: item.collection,
              quantity: item.quantity,
              size: item.size,
              user: userdata.email,
              firstname: userdata.firstname,
              lastname: userdata.lastname,
              address: userdata.address,
              phone: userdata.phone,
              city: userdata.city,
              province: userdata.province,
              postalcode: userdata.postal,
            });
            if (res.status === 200) {
              console.log("Order created successfully", res.data);
            } else {
              console.error("Failed to create order", res.status, res.data);
              setErrorMessage(
                `Failed to create order for ${item.name}. Please contact support.`
              );
            }
          } catch (error) {
            console.error(
              "Error creating order:",
              error.response ? error.response.data : error.message
            );
            setErrorMessage(
              `Error creating order for ${item.name}. Please try again or contact support.`
            );
          }
        })
      );
    } catch (error) {
      console.log("There was an issue with the order:", error);
      setErrorMessage(
        "There was an issue processing your order. Please try again."
      );
    }
  };
  useEffect(() => {
    fetch("http://localhost:3000/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => console.error("Error fetching client secret:", error));
  }, [amount]);

  const handlesubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setErrorMessage("Stripe has not loaded properly. Please try again.");
      setLoading(false);
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${amount}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      addDataToDataBase();
    } else {
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handlesubmit}>
      {clientSecret && <PaymentElement />}
      {errorMessage && <div>{errorMessage}</div>}
      <button
        disabled={!stripe || loading}
        className="text-white w-full py-5 px-2 cursor-pointer bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay $${amount}` : "Processing..."}
      </button>
    </form>
  );
}
