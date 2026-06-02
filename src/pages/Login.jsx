import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

      setMessage(response.data);

      if (response.data.includes("Login Successful")) {
        sessionStorage.setItem("loggedIn", "true");
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);

      setMessage(err.toString());
    }
  };

  return (
    <div>
      <h1>FinTrack Login</h1>

      <br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleLogin}>Login</button>

      <br />
      <br />

      <p>{message}</p>
    </div>
  );
}

export default Login;
