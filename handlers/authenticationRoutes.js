import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Login = async (req, res) => {
   const { username, password } = req.body;

   let user = await userModel.findOne({ username });
   if (!user) {
      return res.json({
         status: 400,
         success: false,
         message: "incorrect username!"
      });
   }
   const isPassMatch = await bcrypt.compare(password, user.password);
   if (!isPassMatch) {
      return res.json({
         status: 400,
         success: false,
         message: "incorrect password!"
      });
   }

   const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "heyytherehereismyjwtsecrete",
      { expiresIn: "7d" }
   );

   return res.status(200).json({
      success: true,
      userId: user._id,
      username: user.username,
      avatar: user.avatar,
      token,
   });
};

export const Signup = async (req, res) => {
   const { username, email, password } = req.body;
   let existUser = await userModel.findOne({ username });
   if (existUser) {
      return res.json({
         success: false,
         status: 400,
         message: "USER_EXISTS"
      });
   }

   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
   let user = await userModel.create({
      username,
      password: hashedPassword,
      email,
      isAuthenticated: true
   });

   const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "heyytherehereismyjwtsecrete",
      { expiresIn: "7d" }
   );

   if (user && token) {
      return res.status(200).json({
         success: true,
         username,
         userId: user._id,
         token
      });
   }
   return 500;
};
