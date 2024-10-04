import chatModel from "../models/chatModel.js";

const getChatMessages = async ({ chatId, page, LIMIT, socket }) => {
  try {
    
    const currentPage = page || 1;
    const limit = LIMIT || 10;
    const skip = (currentPage - 1) * limit;
    const chatMessages = await chatModel.aggregate([
      { $match: { chatId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $group: {
          _id: "$_id",
          messages: { $push: "$messages" }
        }
      }
    ]);    

    return socket.emit("getChatMessagesResponse", chatMessages[0]);
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    socket.emit("getChatMessagesResponse", []);
  }
};

export default getChatMessages;
