import express from "express";
const router = express.Router();

router.post('/getAvatar', async (req, res)=>{
   const user = await userModel.findOne({ _id: req.body.userId })
   res.status(200).send(user.avatar)
})