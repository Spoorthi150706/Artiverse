import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const login = (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Fill all fields");
    localStorage.setItem("user", email);
    nav("/dashboard");
  };

  return (
    <form onSubmit={login}>
      <h2>Artiverse Login</h2>
      <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button>Login</button>
      <Link to="/register">Register</Link>
    </form>
  );
}
