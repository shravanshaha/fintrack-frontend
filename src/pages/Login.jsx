import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.get(
        `/auth?action=login&email=${email}&password=${password}`
      );

      if (response.data.success) {
        sessionStorage.setItem("loggedIn", "true");

        sessionStorage.setItem("userId", response.data.userId);

        sessionStorage.setItem("userName", response.data.name);

        navigate("/dashboard");
      } else {
        setMessage("Invalid Credentials");
      }
    } catch (err) {
      console.log(err);

      setMessage(err.toString());
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>FinTrack Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        {message && <p className="message">{message}</p>}

        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
          }}
        >
          New User? <Link to="/register">Create Account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
