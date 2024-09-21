const Chat = require("../Models/chat");
const chatController = {};


chatController.saveChat = async() => {
    const newMessage = new Chat({
        chat:Message,
        user: {
            id: user._id,
            name: user.name,
        },
    });
    await newMessage.save();    
    return newMessage
};   
module.exports = chatController