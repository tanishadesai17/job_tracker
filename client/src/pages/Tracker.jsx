import { useEffect, useState } from "react";
import axios from "axios";
import "../css/tracker.css";
import "../css/styles.css";

function Tracker({token}) {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState("");
  const aheader = { headers: { Authorization: `Bearer ${token}`}};

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
    try {
      await axios.delete(`http://localhost:8080/applications/${id}`, aheader);
      setMessage("Application deleted!");
      loadApplications();
    } catch {
      setMessage("Error deleting application");
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:8080/applications/${id}`, 
        {status: newStatus}, aheader);

      setMessage("Application updated!");
      loadApplications();
    } catch {
      setMessage("Error updating application");
    }
  };

  return (
    <div className="pageContent">
      <h2 className="pageTitle">My Applications</h2>

      {message && <div className="message">{message}</div>}

      {applications.length === 0 ? (
        <div className="emptyBanner">No applications yet.</div>
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
                  <td>{app.company}</td>
                  <td>{app.position}</td>
                  <td>{app.appDate.split("T")[0]}</td>

                  <td>
                    <select
                      value={app.status}
                      onChange={(e) =>
                        updateStatus(app._id, e.target.value)
                      }
                    >
                      <option value="Applied">Applied</option>
                      <option value="Interviewing">Interviewing</option>
                      <option value="Offer Received">Offer Received</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>

                  <td>{app.notes || "None"}</td>

                  <td>
                    <button
                      className="deleteBtn"
                      onClick={() => deleteApplication(app._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Tracker;