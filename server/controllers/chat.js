import ChatModel from "../models/chat.js";

export const createChat = async (req, res) => {
  const senderId = req.body.senderId;
  const receiverId = req.body.receiverId;

  const existingChat = await ChatModel.findOne({
    members: { $all: [senderId, receiverId] },
  });

  if (existingChat) {
    return res.status(200).json(existingChat);
  }

  const newChat = new ChatModel({
    members: [senderId, receiverId],
  });

  try {
    const result = await newChat.save();
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const userChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};
