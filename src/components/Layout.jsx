"use client";
import Nav from "./Nav";
import Footer from "./Footer";
import SideBar from "./SideBar";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && (
        <header className="sticky top-0 z-[100]">
          <Nav />
        </header>
      )}
      <div className="flex flex-1">
        {isAdminRoute && (
          <aside>
            <SideBar />
          </aside>
        )}
        <main className="flex-1">{children}</main>
      </div>
      {!isAdminRoute && (
        <footer>
          <Footer />
        </footer>
      )}
    </div>
  );
}
