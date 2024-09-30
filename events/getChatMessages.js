import chatModel from "../models/chatModel.js";

const getChatMessages = async ({ chatId, page, LIMIT, socket }) => {
	try {
		const chat = await chatModel.findOne({ chatId });
		if (!chat) return;
		
		const totalMessages = chat.messages.length;
		const startIndex = Math.max(totalMessages - page * LIMIT, 0);
		const endIndex = totalMessages - (page - 1) * LIMIT;
		const limitedMessages = chat.messages.slice(startIndex, endIndex);
		return socket.emit("getChatMessagesResponse", limitedMessages);
	} catch (error) {
		console.error("Error fetching chat messages:", error);
		socket.emit("getChatMessagesResponse", []);
	}
};

export default getChatMessages;
