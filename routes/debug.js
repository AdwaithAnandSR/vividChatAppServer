import express from "express";
const router = express.Router();

import chatModel from "../models/chatModel.js";
import userModel from "../models/userModel.js";

router.get("/users", async (req, res) => {
  const users = await userModel.find({});
  res.send(users);
});

router.get("/chats", async (req, res) => {
  const chats = await chatModel.find({});
  res.send(chats);
});

router.get("/deletechats", async (req, res) => {
  await chatModel.deleteMany({});
  
});

export default router;
