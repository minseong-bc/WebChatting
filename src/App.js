import { useEffect, useState } from "react";
import "./App.css";
import InputField from "./components/InputField/InputField";
import MessageContainer from "./components/MessageContainer/MessageContainer";
import socket from "./server";

function App() {
  const [user,setUser] = useState(null);
  const [message,setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  useEffect(() => {
    socket.on('message',(res) => {
      setMessageList((prevState) => prevState.concat(message));
    });
    askUserName();
  }, []);
  const askUserName = ()=>{
    const userName = prompt("당신의 이름을 입력하세요")
    console.log("userName", userName);

    socket.emit("login", userName, (res)=>{
      if(res?.ok){
        setUser(res.data);
      }
    }); 
  };
  const sendMessage = (event) => {
    event.preventDefault();
    socket.emit("sendMessage", message, (res)   => {
      console.log("sendMessage res",res);
    });
  };
  return (
    <div>
      <div className="App">
        <MessageContainer messageList={messageList} user={user} />
        <InputField 
          message={message} 
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}

export default App;
