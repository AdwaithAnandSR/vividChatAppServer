import Chat from "../models/chatModel.js"

const getUserChats = async ({ userId, socket }) => {
   try {
      const chats = await Chat.find({ participants: userId }).populate(
         "participants"
      );

      return socket.emit("getUserChatsResponse", chats);
   } catch (error) {
      console.error(error);
      return socket.emit("getUserChatsResponse", []);
   }
};

export default getUserChats;