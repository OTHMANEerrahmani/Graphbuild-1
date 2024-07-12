const baseURL = `${import.meta.env.VITE_APP_SERVER}`;

export const checkExistingChat = async (senderId, receiverId) => {
  try {
    const response = await fetch(
      `${baseURL}/chat/find/${senderId}/${receiverId}`
    );
    const chat = await response.json();
    return chat;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createChat = async (senderId, receiverId) => {
  const existingChat = await checkExistingChat(senderId, receiverId);
  if (existingChat) {
    return existingChat;
  } else {
  try {
    const data = {
      senderId: senderId,
      receiverId: receiverId,
    };
    const response = await fetch(`${baseURL}/chat/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newChat = await response.json();

    return newChat;
  } catch (error) {
    console.log(error);
    return null;
  }
  }
};

export const userChats = (id) => {
  return fetch(`${baseURL}/chat/${id}`).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch chats");
    }
    return response.json();
  });
};

export const findChat = (firstId, secondId) => {
  return fetch(`${baseURL}/chat/find/${firstId}/${secondId}`).then((response) =>
    response.json()
  );
};
