import Chat from '../models/chatModel.js';

const getUserChats = async ({userId, socket})=>{
   const chats = await Chat.find({participants: userId})
   .populate('participants');
   socket.emit('getUserChatsResponse', chats)
}

export default getUserChats;