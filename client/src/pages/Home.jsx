import "../css/index.css";
import { Link } from "react-router-dom";

function Home() {
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
