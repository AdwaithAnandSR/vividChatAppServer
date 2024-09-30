import userModel from '../models/userModel.js'

const getUsers = async ({id, socket}) => {
   const user = await userModel.findOne({_id: id})
   if(user)
      socket.emit('getUserResponse', user)
};

export default getUsers;