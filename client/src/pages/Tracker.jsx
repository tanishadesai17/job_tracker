import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/tracker.css";
import "../css/styles.css";

const STATUS_COLORS = {
  "Applied":        { bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" },
  "Interviewing":   { bg: "#f5f3ff", color: "#7c3aed", border: "#ddd6fe" },
  "Offer Received": { bg: "#ecfdf5", color: "#059669", border: "#a7f3d0" },
  "Rejected":       { bg: "#fef2f2", color: "#dc2626", border: "#fecaca" },
};

function StatusBadge({ status }) {
  const s = STATUS_COLORS[status] || {};
  return (
    <span className="statusBadge" style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
      {status}
    </span>
  );
}

function Tracker({ token }) {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const aheader = { headers: { Authorization: `Bearer ${token}` } };

  const loadApplications = async () => {
    try {
      const res = await axios.get("http://localhost:8080/applications", aheader);
      setApplications(res.data);
      setMessage("");
    } catch {
      setMessage("Error loading applications");
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const deleteApplication = async (id) => {
    if (!window.confirm("Delete this application?")) return;
    try {
      await axios.delete(`http://localhost:8080/applications/${id}`, aheader);
      setMessage("Application deleted.");
      loadApplications();
    } catch {
      setMessage("Error deleting application.");
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:8080/applications/${id}`, { status: newStatus }, aheader);
      setEditingId(null);
      loadApplications();
    } catch {
      setMessage("Error updating application.");
    }
  };

  return (
    <div className="pageContent">
      <h2 className="pageTitle">My Applications</h2>

      {message && <div className="toastMsg">{message}</div>}

      {applications.length === 0 ? (
        <div className="emptyBanner">
          <p>📭 No applications yet.</p>
          <Link to="/apply" className="emptyLink">Add your first application →</Link>
        </div>
      ) : (
        <div className="tableContainer">
          <table className="applicationsTable">
            <thead>
              <tr>
                <th>Company</th>
                <th>Position</th>
                <th>Date Applied</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id}>
                  <td><strong>{app.company}</strong></td>
                  <td>{app.position}</td>
                  <td>{app.appDate.split("T")[0]}</td>
                  <td>
                    {editingId === app._id ? (
                      <select
                        autoFocus
                        defaultValue={app.status}
                        onChange={(e) => updateStatus(app._id, e.target.value)}
                        onBlur={() => setEditingId(null)}
                        className="statusSelect"
                      >
                        <option value="Applied">Applied</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Offer Received">Offer Received</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    ) : (
                      <span onClick={() => setEditingId(app._id)} title="Click to change status" style={{ cursor: "pointer" }}>
                        <StatusBadge status={app.status} />
                      </span>
                    )}
                  </td>
                  <td className="notesCell">{app.notes || <span className="noNotes">—</span>}</td>
                  <td>
                    <button className="deleteBtn" onClick={() => deleteApplication(app._id)}>🗑 Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="tableHint">💡 Click a status badge to update it</p>
        </div>
      )}
    </div>
  );
}

export default Tracker;