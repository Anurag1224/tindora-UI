import { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { createSocketConnection } from "../utils/socket";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Chat = () => {

  const {targetUserId} = useParams();
  const user = useSelector(store => store.user);
  // const connections = useSelector(store => store.connections);
  const firstName = user?.data?.firstName;
  const userId = user?.data?._id;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");


  const handleSend = () => {
    const socket = createSocketConnection();
    if (newMessage.trim() === "") return;

    socket.emit("sendMessage", {
      firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("")
  };

  useEffect(()=> {
    if(!userId) return ;
    const socket = createSocketConnection();

    socket.emit("joinChat", {firstName, userId, targetUserId});
    socket.on("messageReceived", ({firstName, text}) => {
      console.log(firstName + " : " + text);
      setMessages((messages) => [...messages, {id: Date.now(), text}])
    });

    return () => {
      socket.disconnect();
    }
  },[userId, targetUserId]);

  return (
    <div className="flex justify-center items-center w-full mt-20">
      <div className="card w-full md:w-1/2 h-[80vh] shadow-xl border rounded-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b bg-base-200">
          <img
            src="https://i.pravatar.cc/50?img=5"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <h2 className="font-semibold text-lg">Ananya</h2>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-base-100">
          {messages.map((msg) => (
            <div
              
              className={`chat ${
                msg.sender === userId ? "chat-end" : "chat-start"
              } mb-2`}
            >
              <div
                className={`chat-bubble ${
                  msg.sender === userId
                    ? "chat-bubble-primary"
                    : "chat-bubble-secondary"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-3 border-t bg-base-200">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="input input-bordered flex-1 focus:border-primary/50 focus:ring-0 focus:outline-none"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              className="btn btn-primary rounded-full"
              onClick={handleSend}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
