import { useEffect, useState, useRef } from "react";

function GlobalChat({ username, token, socket, chatLog }) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatLog]);

  const getInitials = (name) =>
    name ? name.slice(0, 2).toUpperCase() : "?";

  const sendMessage = () => {
    if (message.trim() !== "") {
      const messageData = {
        author: username || "Guest",
        text: message,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      socket.emit("send_message", messageData);
      setMessage("");
    }
  };

  return (
    <div className="chat-wrap">
      <div className="chat-card">
        <div className="chat-header">
          <div className="chat-header-dot" />
          <h3>Career Room</h3>
        </div>
        <div className="chat-messages">
          {chatLog.map((msg, index) => {
            const isMe = msg.author === username;
            return (
              <div key={index} className={`msg ${isMe ? "me" : "other"}`}>
                <div className="msg-meta">
                  {!isMe && <div className="msg-avatar">{getInitials(msg.author)}</div>}
                  {!isMe && <span className="msg-author">{msg.author}</span>}
                  <span className="msg-time">{msg.time}</span>
                  {isMe && <span className="msg-author">{msg.author}</span>}
                  {isMe && <div className="msg-avatar">{getInitials(msg.author)}</div>}
                </div>
                <div className="msg-bubble">{msg.text}</div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input-row">
          <input
            className="chat-input"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
          />
          <button className="chat-send" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default GlobalChat;