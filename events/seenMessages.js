import chatModel from "../models/chatModel.js";

const seenMessages = async ({
	chatId,
	userId,
	chatPartnerId,
	socket,
	users
}) => {
	try {
		let update = await chatModel.updateMany(
			{ chatId },
			{
				$set: { "messages.$[elem].status": "read" }
			},
			{
				arrayFilters: [
					{ "elem.receiver": userId, "elem.status": { $ne: "read" } }
				]
			}
		);

		let senderSocket = users.find(user => user.userId === chatPartnerId);

		if (senderSocket) {
			io.to(senderSocket.id).emit("messageSeenedResponse", {
				chatIdRes: chatId
			});
		}
	} catch (error) {
		console.error("Error updating message status:", error);
	}
};

export default seenMessages;
