import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    await API.post("/users/register/", {
      username,
      password,
    });

    alert("User Created");
  };

  return (
    <>
      <header className="navbar">
        <h2 className="logo">MyWebsite</h2>
        <a href="/">Sign in</a>
      </header>
      <main className="mainContainer">
        <section className="loginSection">
          <div className="loginCard">
            <h2>Register</h2>
            <p className="subtitle">
              Hey, Enter your details to get sign up to your account
            </p>
            <form onSubmit={handleRegister}>
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
              Have an account? <a href="/">Sign in</a>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default Register;
