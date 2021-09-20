import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const ws = new WebSocket(
  "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
);

const ChatPage: React.FC = () => {
  return <Chat />;
};

const Chat: React.FC = () => {
  return (
    <div>
      <Messages />
      <AddMessageForm />
    </div>
  );
};

export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

const Messages: React.FC = () => {
  const [message, setMessage] = useState<ChatMessageType[]>([]);

  useEffect(() => {
    ws.addEventListener("message", (e) => {
      const newMessages = [...JSON.parse(e.data)];
      setMessage((prev) => [...prev, ...newMessages]);
    });
  }, []);

  return (
    <div style={{ height: "400px", overflowY: "auto" }}>
      {message.map((m, index) => (
        <Message key={index} message={m} />
      ))}
    </div>
  );
};

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
  return (
    <div>
      <img src={message.photo} style={{ width: "30px" }} />
      <b>{message.userName}</b>
      <br />
      {message.message}
      <hr />
    </div>
  );
};

const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    ws.send(message);
    setMessage("");
  };
  return (
    <div>
      <div>
        <textarea
          onChange={(e) => setMessage(e.currentTarget.value)}
          value={message}
        ></textarea>
      </div>
      <div>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
