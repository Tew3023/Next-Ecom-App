"use client";
import Nav from "./Nav";
import Footer from "./Footer";
import SideBar from "./SideBar";
import Popup from "./Popup";
import { usePathname } from "next/navigation";
import { store } from "@/app/store/store";
import { Provider } from "react-redux";

export default function Layout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <div>
      <Provider store={store}>
        <div className="min-h-screen flex flex-col">
          {!isAdminRoute && (
            <header className="sticky top-0 z-[100]">
              <Nav />
            </header>
          )}
          {!isAdminRoute && (
            <header className="fixed top-20 right-48 z-[99]">
              <Popup />
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
      </Provider>
    </div>
  );
}
