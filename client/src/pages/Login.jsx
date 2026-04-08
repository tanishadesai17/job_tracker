import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/styles.css";

function Login({ setToken, setUsername }) {
    const [username,setUsernameInput] = useState("");
    const [password,setPassword] = useState("");  const [error, setError] = useState(null);
    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      setToken(data.token);
      setUsername(username);
      navigate("/home");
    } catch (err) {
      setError("try again please");
    }
  };

  return (
    <div className="formContainer">
      <h2>Login</h2>
      {error && <p className="errorMsg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Username </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsernameInput(e.target.value)}
          required
        />
        <p>
        </p>

        <label>Password </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
}

export default Login;