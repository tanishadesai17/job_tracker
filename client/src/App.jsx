import { useState, useEffect } from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import io from "socket.io-client";
import User from "./pages/User";
import Home from "./pages/Home";
import Apply from "./pages/Apply";
import Tracker from "./pages/Tracker";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GlobalChat from "./pages/GlobalChat";
import "./css/styles.css";

const socket = io.connect("http://localhost:8080");

function App() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [chatLog, setChatLog] = useState([]);


  // chat updates
  useEffect(() => {
    socket.on("message_history", (history) => {
      setChatLog(history);
    });
    socket.on("receive_message", (data) => {
      setChatLog((prev) => [...prev, data]);
    });

    return () => {
      socket.off("message_history");
      socket.off("receive_message");
    };
  }, []);



  return (
    <>
      <header className="nav">
        <div className="navInner">
          <div className="brand">Job Application Tracker</div>

          <div className="navLinks">
            <NavLink to="/home" end className={({ isActive }) => `navButton ${isActive ? "active" : ""}`}>Home</NavLink>
            <NavLink to="/apply" className={({ isActive }) => `navButton ${isActive ? "active" : ""}`}>Apply</NavLink>
            <NavLink to="/tracker" className={({ isActive }) => `navButton ${isActive ? "active" : ""}`}>Tracker</NavLink>
            <NavLink to="/chat" className={({ isActive }) => `navButton ${isActive ? "active" : ""}`}>Chat</NavLink>
            {token && <button className="navButton" onClick={() => { setToken(null); setUsername(null); }}>Logout</button>}
          </div>
        </div>
      </header>

      <main className="pageContent">
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/home" element={token ? <Home setToken={setToken} username={username} /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setToken={setToken} setUsername={setUsername} />} />
          <Route path="/register" element={<Register setToken={setToken} setUsername={setUsername} />} />
          <Route path="/apply" element={token ? <Apply token={token} /> : <Navigate to="/login" />} />
          <Route path="/tracker" element={token ? <Tracker token={token} /> : <Navigate to="/login" />} />
          <Route path="/chat" element={token ? <GlobalChat username={username} token={token} socket={socket} chatLog={chatLog} /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </>
  );
}

export default App;