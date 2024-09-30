import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
	chatId: String,
	messages: [
		{
			message: String,
			status: {
				type: String,
				enum: ["sent", "delivered", "read"],
				default: "sent"
			},
			sender: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: "user"
			},
			receiver: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: "user"
			},
			createdAt: {
				type: Date,
				default: Date.now
			}
		}
	],
	participants: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "user"
		}
	],
	createdAt: {
		type: Date,
		default: Date.now
	}
});

export default mongoose.model("chat", chatSchema);
