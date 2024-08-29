"use client";
import MaxWarp from "./MaxWarp";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-green-900 h-20 relative mt-20">
      <MaxWarp>
        <div className="flex justify-between h-full items-center">
          <div>
            <h1 className="text-white font-semibold text-3xl">THESUS</h1>
          </div>
          <div>
            <p className="text-white">
              {" "}
              &copy;{new Date().getFullYear()} All rights reserved{" "}
            </p>
          </div>
          <div className="space-x-5 text-white flex flex-row">
            <Link className="text-sm text-muted-foreground" href="#">
              <p className="text-white">Term</p>
            </Link>
            <Link className="text-sm text-muted-foreground" href="#">
              <p className="text-white">Privacy Policy</p>
            </Link>
            <Link className="text-sm text-muted-foreground" href="#">
              <p className="text-white">Cookie Policy</p>
            </Link>
          </div>
        </div>
      </MaxWarp>
    </footer>
  );
}
