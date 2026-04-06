import { useState } from "react";
import axios from "axios";
import "../css/styles.css";
import "../css/apply.css";

function Apply({token}) {
  const [form, setForm] = useState({
    company: "",
    position: "",
    appDate: "",
    status: "Applied",
    notes: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/applications", form, {headers: { Authorization: `Bearer ${token}`}});
      setMessage("Application added!");
      setForm({
        company: "",
        position: "",
        appDate: "",
        status: "Applied",
        notes: ""
      });
    } catch (err) {
      setMessage(err.response?.data?.error || "Error adding application :(");
    }
  };

  return (
  <div className="pageContent">
    <h2 className="pageTitle">Add a new application!</h2>

    <div className="card formCard">
      <form id="apply" onSubmit={handleSubmit}>
        <label>Company Name</label>
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
          required
        />

        <label>Position</label>
        <input
          type="text"
          name="position"
          value={form.position}
          onChange={handleChange}
          required
        />

        <label>Application Date</label>
        <input
          type="date"
          name="appDate"
          value={form.appDate}
          onChange={handleChange}
          required
        />

        <label>Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          required
        >
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offer Received">Offer Received</option>
        </select>

        <label>Notes</label>
        <textarea
          name="notes"
          rows="3"
          value={form.notes}
          onChange={handleChange}
        />

        <button type="submit">Submit Application</button>
      </form>

      {message && <div id="message">{message}</div>}
    </div>
  </div>
);
}

export default Apply;