import express from "express";
const router = express.Router();

import { Health } from "../handlers/indexRoutes.js";

router.get("/health", Health);

import userModel from '../models/userModel.js'
import chatModel from '../models/chatModel.js'

router.get('/chats', async (req, res)=>{
   const chats = await chatModel.find({})
   res.send(chats)
})
router.get('/users', async (req, res)=>{
   const users = await userModel.find({})
   res.send(users)
})
router.get('/deleteChats', async (req, res)=>{
   await chatModel.deleteMany({})
})

router.get('/a', async (req, res)=>{
   const id = '66e94c3ea69c3a15b0e9d63e'
   const user = await userModel.findOne({_id: id})
   res.status(200).send(user.avatar)
})

export default router;
