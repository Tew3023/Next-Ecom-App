"use client";
import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-full">
      <div className="sticky z-10 left-0 w-80 h-full  py-4 flex flex-col space-y-3 bg-zinc-50 backdrop-blur-lg transition-all border-r border-gray-200">
        <h1 className="px-8 text-2xl font-semibold">
          THESYS
        </h1>
        <Link
          className="px-8 font-light text-md text-zinc-600 transition-all hover:bg-white hover:font-normal"
          href="/admin"
        >
          Dashboard
        </Link>
        <Link
          className="px-8 font-light text-md text-zinc-600 transition-all hover:bg-white hover:font-normal"
          href="/admin/users"
        >
          Users
        </Link>
        <Link
          className="px-8 font-light text-md text-zinc-600 transition-all hover:bg-white hover:font-normal"
          href="/admin/products"
        >
          Products
        </Link>
      </div>
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
}
