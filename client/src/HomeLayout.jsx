import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";

import ChatBot from "./pages/chat/ChatBot";
import { isAdmin, isAuthenticated } from "./helpers/PrivateRouter";
import { SocketContext } from "./context/Context";
import toast, { Toaster } from "react-hot-toast";
import { FaPhone } from "react-icons/fa6";
import { NavBar } from "./components/Layout";
import { Sidebar } from "./components";

export default function HomeLayout() {
  const isAdminUser = isAdmin();
  const isAuthenticatedUser = isAuthenticated();
  // const { answerCall, call, callAccepted } = useContext(SocketContext);

  // useEffect(() => {
  //   if (call.isReceivingCall && !callAccepted) {
  //     toast.custom(
  //       (t) => (
  //         <div
  //           className={`${
  //             t.visible ? "animate-enter" : "animate-leave"
  //           } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
  //         >
  //           <div className="flex-1 w-0 p-4">
  //             <div className="flex items-center">
  //               <div className="flex-shrink-0 pt-0.5">
  //                 <FaPhone size={"25px"} />
  //               </div>
  //               <div className="ml-3 flex-1 items-center">
  //                 <p className="text-sm font-medium text-gray-900">
  //                   <b>Support</b> is Calling
  //                 </p>
  //                 <p className="mt-1 text-sm text-gray-500">
  //                   You have a call from Support.
  //                 </p>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="flex flex-col border-l border-gray-200 items-center justify-center gap-2 px-4 py-1">
  //             <button
  //               className="p-2 rounded-lg text-white bg-black w-full"
  //               onClick={() => toast.dismiss(t.id)}
  //             >
  //               Dismiss
  //             </button>
  //             <button
  //               className="p-2 rounded-lg text-white bg-black w-full"
  //               onClick={() => {
  //                 // answerCall();
  //               }}
  //             >
  //               Answer Call
  //             </button>
  //           </div>
  //         </div>
  //       ),
  //       {
  //         duration: Infinity,
  //       }
  //     );
  //   }
  // }, [call, callAccepted]);

  return (
    <section className="dark:text-white">
      {/* header */}
      {!isAdminUser && isAuthenticatedUser && <ChatBot />}
      <NavBar widget={<Sidebar />} isHome={true} />
      <div className="flex flex-row bg-slate-50 dark:bg-darkPrimary h-screen pt-14 overflow-auto no-scrollbar">
        {/* main page */}
        <Outlet />
      </div>
      <Toaster />
    </section>
  );
}
