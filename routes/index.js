import express from "express";
const router = express.Router();

import { Health } from "../handlers/indexRoutes.js";
import Chat from "../models/chatModel.js";

router.get("/health", Health);

router.get("/msgs", async (req, res) => {
	let chatId = "66cf2a159eceae13d5f9ce21_66cf49ed5bca1be7f3777128";
	let userId = "66cf49ed5bca1be7f3777128";

	let chat = await Chat.find({
		chatId,
		"messages.receiver": userId
	});

	res.send(chat);

});

export default router;
