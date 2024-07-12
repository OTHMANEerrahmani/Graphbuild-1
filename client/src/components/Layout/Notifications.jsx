import { Menu, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { IoIosNotifications } from "react-icons/io";
import { useSelector } from "react-redux";
import { NotificationContext } from "../../context/NotificationContext";

function Notifications() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { notifications, markNotificationAsRead, clearNotifications } =
    useContext(NotificationContext);

  return (
    <Menu as="div" className={`relative hidden sm:block`}>
      <Menu.Button>
        <div>
          <IoIosNotifications
            size={"25px"}
            color={darkMode ? "white" : "black"}
          />
          {notifications.length > 0 && (
            <span className="flex h-3 w-3 absolute top-0 right-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          )}
        </div>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`absolute right-0 z-10 mt-2 md:w-64 w-44 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-max px-4 ${
            !darkMode ? "bg-white" : "bg-darkBackground"
          } `}
        >
          {notifications.length > 0 && (
            <div
              className="text-end text-[10px] p-2"
              onClick={() => {
                clearNotifications();
              }}
            >
              Clear Notifications
            </div>
          )}
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div
                key={index}
                className={`p-2 text-xs md:text-[12px] ${
                  notification.isRead ? "text-gray-500" : "font-semibold"
                }`}
                onClick={() => markNotificationAsRead(index)}
              >
                {notification.message}
              </div>
            ))
          ) : (
            <div
              className={`p-2 text-xs md:text-sm text-center ${
                darkMode ? "text-white" : "text-darkBackground"
              }`}
            >
              No new notifications
            </div>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default Notifications;
