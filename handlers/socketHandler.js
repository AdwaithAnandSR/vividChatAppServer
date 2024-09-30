let users = [];

import join from "../events/join.js";
import getAllUsers from "../events/getAllUsers.js";
import getUser from "../events/getUser.js";
import sendMessage from "../events/sendMessage.js";
import seenMessages from "../events/seenMessages.js";
import getUserChats from "../events/getUserChats.js";
import getChatMessages from "../events/getChatMessages.js";

import chatModel from '../models/chatModel.js'

export default function (io) {
	io.on("connection", socket => {

		socket.on("join", ({ userId }) => {
			join({userId, users, id: socket.id});
		});
		
		socket.on("getAllUsers", ({page, limit}) => {
			getAllUsers({page, limit, socket});
		});
		
		socket.on("getUser", (id)=>{
		   getUser({id, socket});
		});
		
		socket.on("getUserChats", (userId)=>{
		   getUserChats({userId, socket});
		});
		
		socket.on("getChatMessages", ({ chatId, page, LIMIT })=>{
		   getChatMessages({chatId, page, LIMIT, socket});
		});
		
		socket.on("sendMessage", (chat)=>{
		   sendMessage({chat, socket, users});
		});
		
		socket.on("messageSeened", ({chatId, userId, chatPartnerId})=>{
		   seenMessages({chatId, userId, chatPartnerId, socket, users});
		});

		socket.on("disconnect", () => {
			console.log("User disconnected", socket.id);
		});
	});
}
