import { Outlet } from "react-router-dom";

// import { NavBar, Sidebar } from "../../components";

import ChatBot from "../chat/ChatBot";
import { isAdmin, isAuthenticated } from "../../helpers/PrivateRouter";
import { NavBar } from "../../components/Layout";
import { Sidebar } from "../../components";

export default function Layout() {
  return (
    <section>
      {/* header */}
      {!isAdmin() && isAuthenticated() && <ChatBot />}

      <NavBar />
      <div className="flex flex-row bg-slate-50 dark:bg-darkPrimary h-screen pt-14">
        {/* side bar */}
        <Sidebar className="hidden md:block lg:w-1/4 md:w-2/5 sm:w-1/2 " />
        {/* main page */}
        <Outlet />
      </div>
    </section>
  );
}
