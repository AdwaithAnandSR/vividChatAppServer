import chatModel from "../models/chatModel.js";

const sendMessage = async ({ chat, socket, users }) => {
   try {
      const newMessage = {
         message: chat.message,
         sender: chat.sender,
         receiver: chat.receiver
      };

      console.log(users);

      let chatDocument = await chatModel.findOneAndUpdate(
         { chatId: chat.chatId },
         {
            $push: { messages: newMessage },
            $addToSet: { participants: { $each: [chat.sender, chat.receiver] } }
         },
         { new: true, upsert: true }
      );

      socket.emit("sendMessageResponse", {
         tempId: chat.tempId,
         chat: chatDocument.messages[chatDocument.messages.length - 1]
      });

      let receiverSocket = users.find(
         user => user.userId === newMessage.receiver
      );
      if (receiverSocket) {
         io.to(receiverSocket.id).emit(
            "receiveMessage",
            chatDocument.messages[chatDocument.messages.length - 1]
         );
         socket.emit("receiveMessageResponse", { chat });

         await chatModel.updateOne(
            {
               chatId: chat.chatId,
               "messages._id":
                  chatDocument.messages[chatDocument.messages.length - 1]._id
            },
            { $set: { "messages.$.status": "delivered" } }
         );
      } else {
         socket.emit("receiveMessageResponse", {
            error: "Receiver is offline"
         });
      }
   } catch (error) {
      console.error("Error while delivering message: ", error);
      socket.emit("receiveMessageResponse", {
         error: "Message delivery failed"
      });
   }
};
export default sendMessage;
