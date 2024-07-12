import { useContext, useEffect, useRef, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { IoIosSend } from "react-icons/io";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { addMessage, getMessages } from "../../api/MessageRequests";
import { createChat, userChats } from "../../api/ChatRequests";
import { findAdminUser } from "../../api/UserRequests";
import { format } from "timeago.js";
import { NotificationContext } from "../../context/NotificationContext";

function ChatBot() {
  const [showChat, setShowChat] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const toggleChat = () => {
    setShowChat(!showChat);
  };
  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  const auth = useSelector((state) => state.auth);
  const user = auth.user;

  const socket = useRef();

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io(`${import.meta.env.VITE_APP_SOCKET}`);
    socket.current.emit("new-user-add", user._id);
  }, [user]);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [chat, setChat] = useState(null);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (chat && chat.length > 0) {
          const data = await getMessages(chat[0]._id);
          setMessages(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();
  }, [chat]);

  // Send Message
  const handleSend = async (e) => {
    e.preventDefault();

    if (!chat || chat.length === 0 || !newMessage.trim()) {
      return;
    }
    const message = {
      senderId: user?._id,
      text: newMessage,
      chatId: chat[0]._id,
    };
    const receiverId = chat[0].members.find((id) => id !== user?._id);

    // send message to socket server
    setSendMessage({ ...message, receiverId });
    // send message to database
    try {
      const data = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
      setSendMessage(null);
    } catch {
      console.log("error");
    }
  };

  // UseEffect hook

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSend(event);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [handleSend]);

  useEffect(() => {
    const getChats = async () => {
      try {
        const adminUser = await findAdminUser();

        if (adminUser) {
          await createChat(user._id, adminUser._id);

          const data = await userChats(user._id);
          // console.log(data.length);

          setChat(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  const scroll = useRef();
  const imageRef = useRef();
  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showChat]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  const { setNotificationsContext } = useContext(NotificationContext);
  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      setReceivedMessage(data);
    });
    socket.current.on("get-notification", (data) => {
      setNotifications((prev) => [{ ...data, isRead: false }, ...prev]);
      setNotificationsContext((prev) => [
        {
          ...data,
          isRead: false,
          message: "GraphBuild Support sent a message",
        },
        ...prev,
      ]);
    });
  }, []);

  // Receive Message from parent component
  useEffect(() => {
    if (receivedMessage !== null && receivedMessage.chatId === chat[0]._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  const markNotificationsAsRead = (chatId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.chatId !== chatId)
    );
  };
  const notificationLength = notifications.filter(
    (notification) =>
      notification.chatId === chat[0]._id && !notification.isRead
  );

  return (
    <div>
      <div
        className={` absolute right-2 z-30 bottom-2 md:right-10 md:bottom-10 h-14 w-14  rounded-full flex items-center justify-center cursor-pointer ${
          showTooltip
            ? "border-[2px] dark:border-white border-darkPrimary "
            : "border-0"
        }`}
        onMouseEnter={toggleTooltip}
        onMouseLeave={toggleTooltip}
        onClick={() => {
          toggleChat();
          markNotificationsAsRead(chat[0]._id);
        }}
      >
        {notificationLength.length > 0 && !showChat && (
          <div
            className={`absolute w-5 h-5 rounded-full z-40 text-center text-sm dark:bg-white bg-darkPrimary dark:text-black font-medium text-white top-0 right-0`}
          >
            {notificationLength.length}
          </div>
        )}
        <img src={`${import.meta.env.VITE_APP_SERVER}/assets/Bot.png`} alt="" />
        {showTooltip && (
          <div className="absolute right-16 bottom-6 w-44 dark:bg-white bg-darkPrimary rounded-full flex items-center justify-center cursor-pointer text-white dark:text-black">
            Graphbuild support
          </div>
        )}
      </div>

      {showChat && (
        <div className="absolute z-20 md:right-20 md:bottom-20 right-10 bottom-10 bg-white dark:bg-darkSecondary shadow-md rounded-md p-4 lg:w-2/4 xl:w-1/4 w-5/6 h-3/4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold  dark:text-white text-black">
              GraphBuild Support
            </h2>
            <TiDelete
              size={"25px"}
              color="red"
              onClick={() => {
                toggleChat();
                markNotificationsAsRead(chat[0]._id);
              }}
            />
          </div>

          {/* Chat messages */}
          <div className="mt-4 p-2 bg-gray-100 dark:bg-darkPrimary rounded-lg h-5/6 overflow-auto ">
            <div className="flex flex-col gap-2 p-4  overflow-y-auto overflow-x-hidden no-scrollbar md:h-[calc(70vh)] h-[calc(50vh)]">
              {messages.map((message, index) => (
                <div
                  key={index}
                  ref={scroll}
                  className={
                    message.senderId === user?._id
                      ? "bg-buttonBg text-white py-2 px-3 rounded-lg  rounded-br-none max-w-44 w-1/4-max   flex flex-col gap-2 self-end  border-t border-r border-l border-gray-300 bg-gradient-to-b from-green-500 to-green-400"
                      : "bg-buttonBg text-white py-2 px-3 rounded-lg  rounded-bl-none min-w-44  w-1/2-max max-w-3xl flex flex-col gap-2 self-start border-t border-r border-l border-gray-300 bg-gradient-to-b from-blue-500 to-blue-400"
                  }
                >
                  <span>{message.text}</span>
                  <span
                    className={`
                    ${
                      message.senderId === user?._id
                        ? "text-right"
                        : "text-left"
                    } text-sm`}
                  >
                    {format(message.createdAt)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom chat */}
          <div className=" flex flex-row items-center justify-center space-x-2 pt-2 ">
            <input
              type="text"
              placeholder="Type your message..."
              className=" rounded p-2 w-full bg-gray-100 dark:bg-darkPrimary "
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              className=" bg-blue-500 text-white py-2 px-4 rounded"
              onClick={handleSend}
            >
              <IoIosSend size={"25px"} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;
