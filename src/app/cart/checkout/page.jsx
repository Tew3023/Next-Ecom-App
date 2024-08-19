"use client";
import MaxWarp from "@/components/MaxWarp";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Checkoutform from "@/components/checkoutform";
import { Elements } from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/connvertToSubcurrency";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Checkout() {
  const [cart, setCart] = useState([]);

  // Data fields for user information
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postal, setPostal] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCart(JSON.parse(storedCartItems));
    }
  }, []);

  const subtotal = cart
    .reduce((sum, item) => {
      const itemTotal = parseFloat(item.price) * item.quantity;
      return sum + itemTotal;
    }, 0)
    .toFixed(2);

  const paymentMethod = () => {
    if (
      !email ||
      !firstname ||
      !lastname ||
      !address ||
      !city ||
      !province ||
      !postal ||
      !phone
    ) {
      return setError("please complete your information");
    }
    const user = {
      email,
      firstname,
      lastname,
      address,
      city,
      province,
      postal,
      phone,
    };
    setUserdata(user);
  };

  return (
    <section>
      <MaxWarp>
        <div className="grid grid-cols-3 gap-4 mt-10">
          <div className="col-span-2">
            <div className="text-5xl font-semibold mb-5">THESUS</div>
            <p className="text-sm text-zinc-500 font-light flex items-center">
              Cart <ChevronRight className="w-4 h-4" /> Information{" "}
              <ChevronRight className="w-4 h-4" /> Shipping{" "}
              <ChevronRight className="w-4 h-4" /> Payment
            </p>
            {userdata ? (
              <section>
                <div className="border border-spacing-9 p-5 rounded-lg mt-5">
                  <div className="flex space-x-5 mb-2">
                    <p className="text-md font-light text-zinc-500">Contact</p>
                    <p className="text-md">{userdata.email}</p>
                  </div>
                  <div className="flex space-x-5">
                    <p className="text-md font-light text-zinc-500">Ship to</p>
                    <p className="text-md">
                      {userdata.address}
                      {userdata.city}
                      {userdata.province}
                      {userdata.postal}
                    </p>
                  </div>
                </div>
                <div className="mt-10">
                  <Elements
                    stripe={stripePromise}
                    options={{
                      mode: "payment",
                      amount: convertToSubcurrency(subtotal),
                      currency: "usd",
                    }}
                  >
                    <Checkoutform amount={subtotal} userdata={userdata} />
                  </Elements>
                </div>
              </section>
            ) : (
              <section>
                <section className="mt-10 space-y-3">
                  <p className="text-lg">Contact</p>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Email"
                    className="w-full border border-gray-400 py-2 px-3 rounded-lg transition-all"
                  />
                </section>
                <section className="mt-10 space-y-4">
                  <p className="text-lg">Shipping address</p>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      placeholder="Firstname"
                      onChange={(e) => setFirstname(e.target.value)}
                      value={firstname}
                      className="w-full border border-gray-400 py-2 px-3 rounded-lg transition-all"
                    />
                    <input
                      placeholder="Lastname"
                      className="w-full border border-gray-400 py-2 px-3 rounded-lg transition-all"
                      onChange={(e) => setLastname(e.target.value)}
                      value={lastname}
                    />
                  </div>
                  <input
                    placeholder="Address"
                    className="w-full border border-gray-400 py-2 px-3 rounded-lg transition-all"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <input
                      placeholder="City"
                      className="w-full border border-gray-400 py-2 px-3 rounded-lg transition-all"
                      onChange={(e) => setCity(e.target.value)}
                      value={city}
                    />
                    <input
                      placeholder="Province"
                      className="w-full border border-gray-400 py-2 px-3 rounded-lg transition-all"
                      onChange={(e) => setProvince(e.target.value)}
                      value={province}
                    />
                    <input
                      placeholder="Postal code"
                      className="w-full border border-gray-400 py-2 px-3 rounded-lg transition-all"
                      onChange={(e) => setPostal(e.target.value)}
                      value={postal}
                      type="number"
                    />
                  </div>
                  <input
                    placeholder="Phone"
                    className="w-full border border-gray-400 py-2 px-3 rounded-lg transition-all"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    type="number"
                  />
                </section>
              </section>
            )}

            {error && <div className="text-red-500">{error}</div>}
            <section className="flex justify-between mt-10 items-center">
              <Link
                href="/"
                className="text-sm text-blue-500 font-light space-x-4 flex"
              >
                <ChevronLeft className="w-4 h-4" />
                Return to shopping
              </Link>
              {userdata ? null : (
                <button
                  className="bg-blue-500 text-white px-10 py-4 rounded-lg"
                  onClick={paymentMethod}
                >
                  Finish the order
                </button>
              )}
            </section>
          </div>
          <div className="">
            <section>
              {cart.map((item, index) => {
                const itemTotal = (
                  parseFloat(item.price) * item.quantity
                ).toFixed(2);
                return (
                  <div className="grid grid-cols-3 gap-0.5 my-2" key={index}>
                    <div className="relative w-fit">
                      <img
                        className="w-20 h-20 rounded-sm"
                        src={item.url}
                        alt={item.name}
                      />
                      <div className="w-5 h-5 text-white bg-black rounded-full text-center absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                        {item.quantity}
                      </div>
                    </div>

                    <div className="flex flex-col text-sm w-full h-full">
                      <div>{item.name}</div>
                      <div className="text-zinc-500 font-light">
                        {item.size}
                      </div>
                    </div>
                    <div className="text-right">${itemTotal}</div>
                  </div>
                );
              })}
            </section>
            <div className="border-b border-zinc-400"></div>
            <section className="space-y-3 py-3">
              <div className="flex justify-between font-light">
                <div className="text-sm">Subtotal</div>
                <div className="text-sm">${subtotal}</div>
              </div>
              <div className="flex justify-between font-light">
                <div className="text-sm">Shipping</div>
                <div className="text-sm">Free</div>
              </div>
            </section>
            <div className="border-b border-zinc-400"></div>
            <section>
              <div className="flex justify-between mt-3">
                <div className="text-md font-light">Total</div>
                <div className="text-xl font-semibold">${subtotal}</div>
              </div>
            </section>
          </div>
        </div>
      </MaxWarp>
    </section>
  );
}
