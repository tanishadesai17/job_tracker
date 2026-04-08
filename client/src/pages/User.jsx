import { Link } from "react-router-dom";
import "../css/styles.css";

function User() {
  return (
    <div className="homePage">
      <div className="homeContainer">
        <h1>Job Application Tracker</h1>
        <p className="homeSubtitle">Track your applications, land your dream job.</p>
        <div className="homeButtons">
          <Link to="/login" className="button">Login</Link>
          <Link to="/register" className="button">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default User;