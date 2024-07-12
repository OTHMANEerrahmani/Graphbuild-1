import { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { addMessage, getMessages } from "../../api/MessageRequests";
import { getUser } from "../../api/UserRequests";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import { IoAddOutline } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import toast from "react-hot-toast";
import { SocketContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";

const ChatBox = ({
  chat,
  currentUser,
  setSendMessage,
  receivedMessage,
  online,
  setNotifications,
}) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);

    if (!chat || !currentUser) return;

    const getUserData = async () => {
      try {
        const data = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat && currentUser) {
      getUserData();
    }
  }, [chat, currentUser]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessages(chat?._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send Message
  const receiverId = chat?.members.find((id) => id !== currentUser);
  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat?._id,
    };

    // send message to socket server
    setSendMessage({ ...message, receiverId });
    // send message to database
    try {
      const data = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch {
      console.log("error");
    }
  };

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

  // Receive Message from parent component
  useEffect(() => {
    // console.log("Message Arrived: ", receivedMessage);
    if (receivedMessage !== null && receivedMessage.chatId === chat?._id) {
      setMessages([...messages, receivedMessage]);
    }
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => {
        if (notification.chatId === chat?._id) {
          return { ...notification, isRead: true };
        }
        return notification;
      })
    );
  }, [receivedMessage]);

  const scroll = useRef();
  const imageRef = useRef();

  // const {
  //   me,
  //   callAccepted,
  //   name,
  //   setName,
  //   callEnded,
  //   leaveCall,
  //   callUser,
  //   setGetPermission,
  // } = useContext(SocketContext);
  const navigate = useNavigate();
  return (
    <>
      <div className="md:h-full w-full    ">
        {chat ? (
          <>
            {/* chat-header */}
            <div className="">
              <div className="flex flex-row justify-between items-center">
                <div className="flex items-center">
                  <img
                    src={
                      userData?.picturePath
                        ? userData.picturePath.includes("https")
                          ? `${userData.picturePath}`
                          : `${
                              import.meta.env.VITE_APP_SERVER +
                              "/assets/" +
                              userData.picturePath
                            }`
                        : `${
                            import.meta.env.VITE_APP_SERVER
                          }/assets/defaultProfile.png`
                    }
                    alt="Profile"
                    className="w-14 h-14 rounded-full"
                  />
                  <div className="ml-2  flex flex-col">
                    <span>{userData?.name}</span>
                    <div
                      className={`text-xs font-medium ${
                        online ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {online ? "Online" : "Offline"}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2 px-4">
                  {userData?.subscription?.planType && (
                    <div className="flex  items-center justify-centerr px-4 h-10 rounded-full bg-green-300 ">
                      <span className="uppercase font-semibold px-4">
                        {userData?.subscription.planType}
                      </span>
                    </div>
                  )}
                  {
                    // <div>
                    //   <FaPhone
                    //     size={"20px"}
                    //     onClick={
                    //       online
                    //         ? () => {
                    //             callUser(currentUser, receiverId);
                    //             toast(
                    //               (t) => (
                    //                 <span>
                    //                   Calling{" "}
                    //                   <b className="px-2">{userData?.name}</b>
                    //                   <button
                    //                     className="p-2 rounded-lg text-white  bg-black"
                    //                     onClick={() => toast.dismiss(t.id)}
                    //                   >
                    //                     Dismiss
                    //                   </button>
                    //                 </span>
                    //               ),
                    //               {
                    //                 duration: 4000,
                    //               }
                    //             );
                    //           }
                    //         : () => {
                    //             toast(
                    //               (t) => (
                    //                 <span>
                    //                   User is Not <b>Online</b>
                    //                   <button
                    //                     className="px-4"
                    //                     onClick={() => toast.dismiss(t.id)}
                    //                   >
                    //                     Dismiss
                    //                   </button>
                    //                 </span>
                    //               ),
                    //               {
                    //                 duration: 1000,
                    //               }
                    //             );
                    //           }
                    //     }
                    //   />
                    // </div>
                  }
                </div>
              </div>

              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "10px",
                }}
              />
            </div>
            {/* chat-body */}
            <div className="flex flex-col gap-2 p-4 overflow-y-auto overflow-x-hidden no-scrollbar md:h-[calc(70vh)] h-[calc(50vh)]">
              {messages.map((message, index) => (
                <div
                  key={index}
                  ref={scroll}
                  className={
                    message.senderId === currentUser
                      ? "bg-buttonBg text-white py-2 px-3 rounded-lg  rounded-br-none min-w-44  w-1/2-max max-w-3xl flex flex-col gap-2 self-end  border-t border-r border-l border-gray-300 bg-gradient-to-b from-green-500 to-green-400"
                      : "bg-buttonBg text-white py-2 px-3 rounded-lg  rounded-bl-none min-w-44  w-1/2-max max-w-3xl flex flex-col gap-2 self-start border-t border-r border-l border-gray-300 bg-gradient-to-b from-blue-500 to-blue-400"
                  }
                >
                  <span>{message.text}</span>
                  <span
                    className={`
                    ${
                      message.senderId === currentUser
                        ? "text-right"
                        : "text-left"
                    } text-sm`}
                  >
                    {format(message.createdAt)}
                  </span>
                </div>
              ))}
            </div>
            {/* chat-sender */}
            <div className="flex flex-row items-center ">
              <div
                className="flex items-center justify-center border-2 text-center rounded-full w-10 h-10"
                onClick={() => imageRef.current.click()}
              >
                <IoAddOutline />
              </div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div
                className="buttonSideBar border-2 text-center rounded-full px-4 py-2"
                onClick={handleSend}
              >
                Send
              </div>
              <input
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
                ref={imageRef}
              />
            </div>
          </>
        ) : (
          <span className="h-full flex items-center justify-center text-xl font-bold">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
