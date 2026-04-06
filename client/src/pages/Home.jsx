import "../css/index.css";
import { Link, useNavigate } from "react-router-dom";

function Home({ setToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate("/");
  };

  return (
    <div className="homePage">
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