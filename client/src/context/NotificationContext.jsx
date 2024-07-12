import { createContext, useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notifications, setNotificationsContext] = useState([]);

  const clearNotifications = () => {
    setNotificationsContext([]);
  };

  const markNotificationAsRead = (index) => {
    setNotificationsContext((prev) =>
      prev.map((notification, i) =>
        i === index ? { ...notification, isRead: true } : notification
      )
    );
  };
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        clearNotifications,
        markNotificationAsRead,
        setNotificationsContext,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider, NotificationContext };
