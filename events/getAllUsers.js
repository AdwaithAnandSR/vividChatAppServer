import userModel from "../models/userModel.js";

const getAllUsers = async ({ page, limit, socket}) => {
	try {
		const users = await userModel
			.find({})
			.skip((page - 1) * limit)
			.limit(limit);
		if (users) socket.emit("getAllUsersResponse", users);
	} catch (err) {
		console.log(err);
	}
};

export default getAllUsers;
