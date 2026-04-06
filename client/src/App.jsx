import { useState } from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import User from "./pages/User";
import Home from "./pages/Home";
import Apply from "./pages/Apply";
import Tracker from "./pages/Tracker";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./css/styles.css";

function App() {
  const [token, setToken] = useState(null);


  return (
    <>
      <header className="nav">
        <div className="navInner">
          <div className="brand">Job Application Tracker</div>

          <div className="navLinks">
            <NavLink to="/home" end className={({ isActive }) => `navButton ${isActive ? "active" : ""}`}>Home</NavLink>
            <NavLink to="/apply" className={({ isActive }) => `navButton ${isActive ? "active" : ""}`}>Apply</NavLink>
            <NavLink to="/tracker" className={({ isActive }) => `navButton ${isActive ? "active" : ""}`}>Tracker</NavLink>
            {token && <button className="navButton" onClick={() => { setToken(null); }}>Logout</button>}
          </div>
        </div>
      </header>

      <main className="pageContent">
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/home" element={token ? <Home setToken={setToken} /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
          <Route path="/apply" element={token ? <Apply token={token} /> : <Navigate to="/login" />} />
          <Route path="/tracker" element={token ? <Tracker token={token} /> : <Navigate to="/login" />} />
         
        </Routes>
      </main>
    </>
  );
}

export default App;