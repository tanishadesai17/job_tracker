import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/styles.css";

function Register({ setToken, setUsername }) {
  const [username, setUsernameInput] = useState("");
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
        setError(data.message || "Registration failed.");
        return;
      }

      setToken(data.token);
      setUsername(username);
      navigate("/home");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="formContainer">
      <h2>Create an Account</h2>
      {error && <p className="errorMsg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsernameInput(e.target.value)}
          placeholder="Choose a username"
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Choose a password"
          required
        />

        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}

export default Register;