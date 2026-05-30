import React, {
  useEffect,
  useState,
} from "react";

import { io } from "socket.io-client";

function App() {
  const [message, setMessage] =
    useState("");

  const [socket, setSocket] =
    useState(null);

  const [messages, setMessages] =
    useState([]);

  useEffect(() => {
    const newSocket =
      io("http://localhost:8000");

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on(
      "server:message",
      (data) => {
        setMessages((prev) => [
          ...prev,
          {
            text: data,
            type: "received",
          },
        ]);
      }
    );

    return () => {
      socket.off(
        "server:message"
      );
    };
  }, [socket]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        text: message,
        type: "sent",
      },
    ]);

    socket.emit(
      "client:message",
      message
    );

    setMessage("");
  };

  return (
    <>
      <style>
        {`
          *{
            margin:0;
            padding:0;
            box-sizing:border-box;
            font-family:Arial,sans-serif;
          }

          body{
            background:#3333;
          }

          .container{
            height:100vh;
            display:flex;
            justify-content:center;
            align-items:center;
          }

          .chat-box{
            width:420px;
            height:600px;
            background:#333;
            border-radius:12px;
            overflow:hidden;

            display:flex;
            flex-direction:column;

            box-shadow:0 4px 20px rgba(0,0,0,0.1);
          }

          .header{
            background:#2563eb;
            color:white;
            padding:16px;
            font-size:20px;
            font-weight:bold;
          }

          .messages{
            flex:1;
            padding:16px;

            display:flex;
            flex-direction:column;
            gap:12px;

            overflow-y:auto;
          }

          .message{
            max-width:70%;
            padding:10px 14px;
            border-radius:12px;
          }

          .sent{
            align-self:flex-end;
            background:#2563eb;
            color:white;
          }

          .received{
            align-self:flex-start;
            background:#e5e7eb;
          }

          .input-area{
            display:flex;
            gap:10px;
            padding:12px;
            border-top:1px solid #ddd;
          }

          .input{
            flex:1;
            padding:10px;
            border:1px solid #ccc;
            border-radius:8px;
            outline:none;
          }

          .button{
            padding:10px 16px;
            border:none;
            border-radius:8px;
            background:#2563eb;
            color:white;
            cursor:pointer;
          }

          .button:hover{
            background:#1d4ed8;
          }
        `}
      </style>

      <div className="container">
        <div className="chat-box">
          <div className="header">
            Realtime Chat
          </div>

          <div className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.type}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="input-area">
            <input
              className="input"
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button
              className="button"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;