"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import MaxWarp from "@/components/MaxWarp";
import { Trash2, Plus, Minus } from "lucide-react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Retrieve cart items from localStorage when the component mounts
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    } else {
      console.log("No items found in cart.");
    }
  }, []);

  const subtotal = cartItems
    .reduce((sum, item) => {
      const itemTotal = parseFloat(item.price) * item.quantity;
      return sum + itemTotal;
    }, 0)
    .toFixed(2);

  const deleteData = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  const updateQuantity = (index, change) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = Math.max(
      updatedCartItems[index].quantity + change,
      1
    ); // Prevent quantity from going below 1
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  return (
    <div className="mt-20">
      <MaxWarp className={"max-w-full"}>
        {cartItems.length > 0 ? (
          <div>
            <div className="flex justify-between">
              <h1 className="text-4xl">Your cart</h1>
              <Link
                href="/collection/All-weather"
                className="flex items-end text-zinc-500 underline underline-offset-4"
              >
                Continue shopping
              </Link>
            </div>
            <table className="min-w-full divide-y mt-10">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-sm text-zinc-400 font-light text-left">
                    Product
                  </th>
                  <th className="px-6 py-3 text-sm text-zinc-400 font-light text-left"></th>
                  <th className="px-6 py-3 text-sm text-zinc-400 font-light text-left w-60">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-sm text-zinc-400 font-light text-right w-60">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cartItems.map((item, index) => {
                  const itemTotal = (
                    parseFloat(item.price) * item.quantity
                  ).toFixed(2);
                  return (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap w-48">
                        <img
                          className="w-32 h-32 rounded-sm"
                          src={item.url}
                          alt={item.name}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left flex">
                        <div className="h-full flex flex-col">
                          <p>{item.name}</p>
                          <p className="text-zinc-500">{item.price} $</p>
                          <p className="text-zinc-500">size: {item.size}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap w-fit">
                        <div className="text-zinc-500 flex items-center space-x-5 w-fit">
                          <div className="flex items-center space-x-5 border border-zinc-500 p-3">
                            <button onClick={() => updateQuantity(index, -1)}>
                              <Minus className="w-4 h-4 cursor-pointer" />
                            </button>
                            <p className="w-10 text-center">{item.quantity}</p>
                            <button onClick={() => updateQuantity(index, 1)}>
                              <Plus className="w-4 h-4 cursor-pointer" />
                            </button>
                          </div>
                          <Trash2
                            onClick={() => deleteData(index)}
                            className="w-4 h-4 cursor-pointer"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right w-20">
                          {itemTotal} $
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="border-b-2 border-zinc-100 pt-10"></div>
            <div className="w-full text-right mt-5">
              <p className="text-lg mb-8">Subtotal {subtotal} $</p>
              <Link href={`/cart/checkout`} className="text-center bg-green-950 rounded-full text-white px-20 py-5 ">
                Check out
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center mt-[22vh]">
            <h1 className="text-5xl text-green-950 font-semibold">
              Your cart is empty
            </h1>
            <div className="mt-20">
              <Link href="/collection/All-weather">
                <button className="bg-green-950 text-white px-16 py-3 rounded-full">
                  Continue shopping
                </button>
              </Link>
            </div>
            <div className="mt-20 space-y-5">
              <p className="text-2xl text-green-950 font-semibold">
                Have an account?
              </p>
              <p>
                <Link href='/login' className="underline underline-offset-2">Log in</Link> to
                check out faster.
              </p>
            </div>
            <div>

            </div>
          </div>
        )}
      </MaxWarp>
    </div>
  );
}
