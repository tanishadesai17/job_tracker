import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/styles.css";

function Register({ setToken }) {
  const [username, setUsrname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      setToken(data.token);
      navigate("/login");
    } catch (err) {
      setError("try again");
    }
  };

  return (
    <div className="formContainer">
      <h2>Register</h2>
      {error && <p className="errorMsg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Username </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsrname(e.target.value)}
          required
        />
        <p></p>
        <label>Password </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}

export default Register;