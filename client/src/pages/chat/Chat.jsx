import { useRef, useState } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import Conversation from "../../components/Coversation/Conversation";

import { useEffect } from "react";
import { userChats } from "../../api/ChatRequests";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

const Chat = () => {
  const dispatch = useDispatch();
  const socket = useRef();
  const auth = useSelector((state) => state.auth);
  const user = auth.user;

  const [chats, setChats] = useState([]);
  // console.log(user._id);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [online, setOnline] = useState(null);
  const [socketId, setSocketId] = useState(null);
  const [meSocketId, setMeSocketId] = useState(null);

  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [notifications, setNotifications] = useState([]);
  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const data = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io(`${import.meta.env.VITE_APP_SOCKET}`);
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      setReceivedMessage(data);
    });

    socket.current.on("get-notification", (data) => {
      setNotifications((prev) => [{ ...data, isRead: false }, ...prev]);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  const markNotificationsAsRead = (chatId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.chatId !== chatId)
    );
  };

  return (
    <div className="flex flex-col md:flex-row  h-full w-full">
      {/* Left Side */}
      <div className="p-4 md:w-1/6 w-full ">
        <div className="flex flex-col  h-full bg-white dark:bg-darkSecondary rounded-lg shadow-md">
          <h2 className="hidden md:block text-lg font-semibold p-4 border-b border-gray-200">
            Chats
          </h2>
          <div className="md:overflow-y-auto overflow-x-auto no-scrollbar w-full  ">
            <div className="md:p-4 p-2 text-center  flex md:flex-col gap-4 md:gap-0">
              {chats.map((chat, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setCurrentChat(chat);
                    setOnline(checkOnlineStatus(chat));
                    markNotificationsAsRead(chat._id);
                    setSocketId(null);
                  }}
                  className="cursor-pointer md:mb-4"
                >
                  <Conversation
                    data={chat}
                    currentUser={user?._id}
                    online={checkOnlineStatus(chat)}
                    showNotification={currentChat?._id == chat?._id}
                    notifications={notifications.filter(
                      (notification) =>
                        notification.chatId === chat._id && !notification.isRead
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex flex-col  md:w-5/6 w-full p-4 h-full">
        <div className="flex-1 md:p-4 p-2 bg-white dark:bg-darkSecondary rounded-lg h-full">
          <ChatBox
            chat={currentChat}
            currentUser={user?._id}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
            setNotifications={setNotifications}
            online={online}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
