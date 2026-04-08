import { use } from "react";
import "../css/index.css";
import { Link, useNavigate } from "react-router-dom";

function Home({ setToken, username }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate("/");
  };

  return (
    <div className="homePage">
      <h2>Welcome, {username}!</h2>
      <div className="homeContainer">
        <h1>Job Application Tracker</h1>

        <div className="homeButtons">
          <Link to="/apply" className="button">Add New Application</Link>
          <Link to="/tracker" className="button">View Applications</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;