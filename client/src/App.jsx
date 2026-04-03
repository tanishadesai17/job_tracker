import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Apply from "./pages/Apply";
import Tracker from "./pages/Tracker";
import "./css/styles.css";

function App() {
  const location = useLocation();
  const hideNavOnHome = location.pathname === "/";

  return (
    <>
  <header className="nav">
    <div className="navInner">
      <div className="brand">Job Application Tracker</div>

      <div className="navLinks">
        <NavLink to="/" end className={({ isActive }) => `navButton ${isActive ? "active" : ""}`}>Home</NavLink>
        <NavLink to="/apply" className={({ isActive }) => `navButton ${isActive ? "active" : ""}`}>Apply</NavLink>
        <NavLink to="/tracker" className={({ isActive }) => `navButton ${isActive ? "active" : ""}`}>Tracker</NavLink>
      </div>
    </div>
  </header>

  {/* PAGE CONTENT */}
  <main className="pageContent">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/apply" element={<Apply />} />
      <Route path="/tracker" element={<Tracker />} />
    </Routes>
  </main>
</>
  );
}

export default App;