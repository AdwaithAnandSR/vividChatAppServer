import chatModel from "../models/chatModel.js";

const sendMessage = async ({ chat, socket, users }) => {
	const newMessage = {
		message: chat.message,
		sender: chat.sender.id,
		receiver: chat.receiver.id
	};
	
	let chatDocument = await chatModel.findOneAndUpdate(
		{ chatId: chat.chatId },
		{
			$push: { messages: newMessage },
			$addToSet: { participants: { $each: [chat.sender.id, chat.receiver.id] } }
		},
		{ new: true, upsert: true }
	);

	let receiverSocket = users.find(user => user.userId === newMessage.receiver)
	if (receiverSocket) {
		io.to(receiverSocket.id).emit(
			"receiveMessage",
			chatDocument.messages[chatDocument.messages.length - 1]
		);
		socket.emit('receiveMessageResponse', { chat })
		await chatModel.updateOne(
			{ chatId: chat.chatId, "messages._id": chatDocument.messages[chatDocument.messages.length - 1]._id },
			{ $set: { "messages.$.status": "delivered" } }
		);
	}
	
};
export default sendMessage;
