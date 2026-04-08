import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/styles.css";
import "../css/home.css";

const QUOTES = [
  "Every application is one step closer to your dream job.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "Keep going. Your next application could be the one.",
  "The secret to getting ahead is getting started.",
  "Great things never came from comfort zones.",
];

function StatCard({ emoji, label, count, color }) {
  return (
    <div className="statCard" style={{ borderTop: `4px solid ${color}` }}>
      <div className="statEmoji">{emoji}</div>
      <div className="statCount" style={{ color }}>{count}</div>
      <div className="statLabel">{label}</div>
    </div>
  );
}

function Home({ token, username }) {
  const [applications, setApplications] = useState([]);
  const [quote] = useState(QUOTES[Math.floor(Math.random() * QUOTES.length)]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/applications", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setApplications(res.data))
      .catch(() => {});
  }, [token]);

  const counts = {
    total: applications.length,
    applied: applications.filter((a) => a.status === "Applied").length,
    interviewing: applications.filter((a) => a.status === "Interviewing").length,
    offer: applications.filter((a) => a.status === "Offer Received").length,
    rejected: applications.filter((a) => a.status === "Rejected").length,
  };

  const successRate =
    counts.total > 0
      ? Math.round(((counts.interviewing + counts.offer) / counts.total) * 100)
      : 0;

  return (
    <div className="homeDashboard">
      {/* Welcome Banner */}
      <div className="welcomeBanner">
        <div className="welcomeLeft">
          <h1 className="welcomeTitle">Welcome back, {username}! 👋</h1>
          <p className="welcomeQuote">"{quote}"</p>
        </div>
        <div className="welcomeRight">
          <div className="successRateRing">
            <svg viewBox="0 0 36 36" className="ringsvg">
              <path
                className="ringBg"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="ringFill"
                strokeDasharray={`${successRate}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="ringLabel">
              <span className="ringPercent">{successRate}%</span>
              <span className="ringText">Response Rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="statsRow">
        <StatCard emoji="📋" label="Total Applied" count={counts.total} color="#2f6fe4" />
        <StatCard emoji="⏳" label="Pending" count={counts.applied} color="#f59e0b" />
        <StatCard emoji="🤝" label="Interviewing" count={counts.interviewing} color="#8b5cf6" />
        <StatCard emoji="🎉" label="Offer Received" count={counts.offer} color="#10b981" />
        <StatCard emoji="❌" label="Rejected" count={counts.rejected} color="#ef4444" />
      </div>

      {/* Quick Actions */}
      <div className="quickActions">
        <Link to="/apply" className="actionCard actionBlue">
          <span className="actionIcon">➕</span>
          <span className="actionLabel">Add Application</span>
          <span className="actionSub">Log a new job application</span>
        </Link>
        <Link to="/tracker" className="actionCard actionPurple">
          <span className="actionIcon">📊</span>
          <span className="actionLabel">View Tracker</span>
          <span className="actionSub">Manage all your applications</span>
        </Link>
        <Link to="/chat" className="actionCard actionGreen">
          <span className="actionIcon">💬</span>
          <span className="actionLabel">Career Chat</span>
          <span className="actionSub">Connect with other job seekers</span>
        </Link>
      </div>
    </div>
  );
}

export default Home;