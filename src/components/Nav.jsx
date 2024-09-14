"use client";
import { Search, User, ShoppingBag } from "lucide-react";
import Link from "next/link";
import MaxWarp from "./MaxWarp";
import { useEffect, useState } from "react";

// Custom hook to manage cart state
function useCart() {
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const updateCartQuantity = () => {
      const storedCartItems = localStorage.getItem("cartItems");
      if (storedCartItems) {
        const cartItems = JSON.parse(storedCartItems);
        const total = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        setTotalQuantity(total);
      } else {
        setTotalQuantity(0);
      }
    };

    // Initial update
    updateCartQuantity();

    // Set up an interval to check for changes
    const intervalId = setInterval(updateCartQuantity, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return totalQuantity;
}

export default function Nav() {
  const totalQuantity = useCart();

  return (
    <div className="sticky top-0 z-[100] w-full h-20 bg-white/75 backdrop-blur-lg border-b border-gray-200">
      <MaxWarp>
        <div className="flex h-20 items-center justify-between">
          <div className="space-x-6">
            <Link href="/" className="text-2xl font-semibold">
              THESYS
            </Link>
            <Link
              className="text-md hover:underline underline-offset-4 decoration-1"
              href="/collection/Rain"
            >
              Rain
            </Link>
            <Link
              className="text-md hover:underline underline-offset-4 decoration-1"
              href="/collection/Snow"
            >
              Snow
            </Link>
            <Link
              className="text-md hover:underline underline-offset-4 decoration-1"
              href="/collection/Sun"
            >
              Sun
            </Link>
            <Link
              className="text-md hover:underline underline-offset-4 decoration-1"
              href="/collection/All-weather"
            >
              All weather
            </Link>
            <Link
              className="text-md hover:underline underline-offset-4 decoration-1"
              href="#"
            >
              Thesus™ Collaboration Hub
            </Link>
          </div>
          <div className="space-x-5 flex">
            <Search className="w-5 h-5 font-extralight" />
            <Link href="/login">
              <User className="w-5 h-5" />
            </Link>
            <Link className="relative inline-block" href="/cart">
              <ShoppingBag className="w-5 h-5 text-gray-700" />
              {totalQuantity > 0 ? (
                <span className="absolute top-2 -right-1 bg-black text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalQuantity}
                </span>
              ) : null}
            </Link>
          </div>
        </div>
      </MaxWarp>
    </div>
  );
}