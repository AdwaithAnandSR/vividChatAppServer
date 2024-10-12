const join = ({ userId, users, id }) => {
   const userIndex = users.findIndex(user => user.userId === userId);

   if (userIndex !== -1) {
      users[userIndex].id = id;
   } else {
      users.push({
         userId,
         id
      });
   }
};

export default join;
