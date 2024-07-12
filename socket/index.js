require("dotenv").config();

const io = require("socket.io")(8800, {
  cors: {
    origin: process.env.APP_CLIENT,
    methods: ["GET", "POST"],
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  // add new User
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New User Connected", activeUsers);
    }

    // send all active users to new user
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    // send all active users to all users
    io.emit("get-users", activeUsers);
  });

  // send message to a specific user
  socket.on("send-message", (data) => {
    const { receiverId } = data;

    const user = activeUsers.find((user) => user.userId === receiverId);
    // console.log("Data: ", data);

    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
      io.to(user.socketId).emit("get-notification", {
        chatId: data.chatId,
        senderId: data.senderId,
        isRead: false,
        date: new Date(),
      });
    }
  });

  socket.on("callUser", (data) => {
    console.log("Server received 'callUser' event");

    const { userToCall, signalData, from, name } = data;

    const user = activeUsers.find((user) => user.userId === userToCall);
    const userMe = activeUsers.find((user) => user.userId === from);
    // .to(user.socketId)
    if (user) {
      io.emit("callUser", {
        signal: signalData,
        from: userMe.socketId,
        name,
      });
    }
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});
