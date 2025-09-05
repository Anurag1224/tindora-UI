import { useEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { createSocketConnection } from "../utils/socket";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const firstName = user?.data?.firstName;
  const lastName = user?.data?.lastName;
  const userId = user?.data?._id;
  const photoUrl = user?.data?.photoUrl?.[0];

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          photoUrl: senderId?.photoUrl?.[0],
          text,
          senderId: senderId?._id,
        };
      });
      setMessages(chatMessages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  const handleSend = () => {
    const socket = createSocketConnection();
    if (newMessage.trim() === "") return;

    socket.emit("sendMessage", {
      firstName,
      lastName,
      userId,
      targetUserId,
      text: newMessage,
      photoUrl,
    });
    setNewMessage("");
  };

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();

    socket.emit("joinChat", { firstName, userId, targetUserId });
    socket.on("messageReceived", ({ firstName, lastName, text, photoUrl }) => {
      setMessages((messages) => [
        ...messages,
        { firstName, lastName, text, photoUrl, senderId: userId },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex justify-center items-center w-full mt-16 sm:mt-20 mb-20 sm:mb-0 ">
      <div className="card w-full md:w-1/2 h-[80vh] shadow-xl sm:border sm:rounded-2xl overflow-hidden flex flex-col">
        <div className=" hidden sm:flex items-center h-[20px] sm:h-auto p-4 border-b bg-base-200">
          <h2 className="font-semibold text-lg">Chat</h2>
        </div>

        <div className="flex-1 p-4 overflow-y-auto bg-base-100 flex flex-col space-y-4">
          {messages.map((msg, index) => {
            const isOwnMessage = msg.firstName === firstName;
            return (
              <div
                key={index}
                className={`flex items-end ${
                  isOwnMessage ? "justify-end" : "justify-start"
                }`}
              >
                {!isOwnMessage && msg.photoUrl && (
                  <img
                    src={msg.photoUrl}
                    alt="sender"
                    className="w-9 h-9 rounded-full mr-2 shadow"
                  />
                )}

                <div
                  className={`px-4 py-2 rounded-2xl shadow-md break-words max-w-[70%] ${
                    isOwnMessage
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-secondary text-white rounded-bl-none"
                  }`}
                >
                  
                  <p className="text-sm">{msg.text}</p>
                </div>

                {isOwnMessage && photoUrl && (
                  <img
                    src={photoUrl}
                    alt="me"
                    className="w-7 h-7 rounded-full ml-2 opacity-80"
                  />
                )}
              </div>
            );
          })}

          {/* Always scroll here */}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 border-t bg-base-200">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="input input-bordered flex-1 focus:border-primary/50 focus:ring-0 focus:outline-none rounded-full"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              className="btn btn-primary rounded-full px-4 py-2 shadow"
              onClick={handleSend}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
