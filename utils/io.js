const chatController = require("../Controllers/chat.controller");

module.exports=function(io){
    io.on("connection",async(socket)=>{
        console.log("connect complete", socket.id);

        socket.on("login",async(userName,cb)=>{   // 유저 정보 저장
            try{
                const user = await userController.saveUser(userName, socket.id);
                const welcomeMessage = {
                    chat: `${user.name} 님이 방에 들어왔습니다.`,
                    user: { id: null, name: "system" },
                };
                io.emit("message", welcomeMessage);
                cb({ ok: true, data: user });
            }catch(error){
                cb({ ok: false, error: error.message });
            }
        });
        
        socket.on("sendMessage", async(message, cb) => { // 유저찾기 by socket.id
            try{
                const user = userController.checkUser(socket.id);
                // 메세지 저장
                const newMessage = await chatController.saveChat(message,user);
                // 현재 서버에 접속중인 모든 사용자에게 새로운 메세지가 있다고 알림
                io.emit("message",newMessage);
                cb({ok:true})                
            }catch(error){
                cb({ ok: false, error: error.message });
            }
        })

        socket.on("disconnect",()=>{
            console.log("client disconnect");
        });
    });
};