"use client";
import { Search, User, ShoppingBag } from "lucide-react";
import Link from "next/link";
import MaxWarp from "./MaxWarp";
import { useEffect, useState } from "react";

export default function Nav() {
  const [cartLen, setCartLen] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0); // State for total quantity

  const updateCartLen = () => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartLen(JSON.parse(storedCartItems));
    } else {
      setCartLen([]); 
    }
  };

  useEffect(() => {
    const total = cartLen.reduce((acc, item) => acc + item.quantity, 0);
    setTotalQuantity(total);
  }, [cartLen]);
  

  useEffect(() => {
    updateCartLen();

    const handleStorageChange = () => {
      updateCartLen();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="sticky z-[100] top-0 w-full h-20  border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all inset-x-0">
      <MaxWarp>
        <div className="flex h-20 items-center justify-between border-b border-zinc-200">
          <div className="space-x-6">
            <Link href="/" className="text-2xl font-semibold">
              THESUS
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
