import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    document.title = "Login | MyWebsite";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/users/login/", {
        username,
        password,
      });

      const access = res.data.access;
      const refresh = res.data.refresh;

      localStorage.setItem("token", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("activeAccount", username);

      const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

      const exists = accounts.find((a) => a.username === username);

      if (!exists) {
        accounts.push({
          username,
          refresh,
        });
      } else {
        exists.refresh = refresh;
      }

      localStorage.setItem("accounts", JSON.stringify(accounts));

      navigate("/home");
    } catch {
      alert("Invalid login");
    }
  };

  return (
    <>
      <header className="navbar">
        <h2 className="logo">MyWebsite</h2>
        <a href="/register">Sign up</a>
      </header>
      <main className="mainContainer">
        <section className="loginSection">
          <div className="loginCard">
            <h2>Login</h2>
            <p className="subtitle">
              Hey, Enter your details to get sign in to your account
            </p>
            <form onSubmit={handleLogin}>

            <input
              type="text"
              id="uname"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="signBtn">
              Sign-in
            </button>
          </form>
            <p className="request">
              Don't have an account? <a href="/register">Sign up</a>
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        Copyright © wework 2022 | Privacy Policy
      </footer>
    </>
  );
}

export default Login;
