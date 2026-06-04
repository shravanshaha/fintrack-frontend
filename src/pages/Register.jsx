import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await api.get(
        `/auth?action=register&name=${name}&email=${email}&password=${password}`
      );

      setMessage(response.data);

      if (response.data.includes("User Registered Successfully")) {
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (err) {
      console.log(err);
      setMessage(err.toString());
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Create Account</h1>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button onClick={handleRegister}>Register</button>

        <p className="message">{message}</p>

        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
          }}
        >
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
