import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SwitchAccount() {
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("accounts")) || [];
    setAccounts(saved);
  }, []);

  const switchAccount = async (username) => {
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    const acc = accounts.find((a) => a.username === username);

    if (!acc) return;

    try {
      // generate new access token
      const res = await axios.post("http://127.0.0.1:8000/api/users/refresh/", {
        refresh: acc.refresh,
      });

      const newAccess = res.data.access;

      localStorage.setItem("token", newAccess);
      localStorage.setItem("refresh", acc.refresh);
      localStorage.setItem("activeAccount", acc.username);
      const updated = accounts.map((a) =>
        a.username === username ? { ...a, access: newAccess } : a,
      );

      localStorage.setItem("accounts", JSON.stringify(updated));
      window.location.href = "/home";
    } catch {
      // refresh expired → ask password
      const password = prompt("Session expired. Enter password");

      if (!password) return;

      try {
        const login = await axios.post(
          "http://127.0.0.1:8000/api/users/login/",
          {
            username: username,
            password: password,
          },
        );

        const access = login.data.access;
        const refresh = login.data.refresh;

        localStorage.setItem("token", access);
        localStorage.setItem("refresh", refresh);
        localStorage.setItem("activeAccount", username);

        const updated = accounts.map((a) =>
          a.username === username ? { ...a, refresh } : a,
        );

        localStorage.setItem("accounts", JSON.stringify(updated));
        navigate("/home");
        // window.location.href = "/home";
      } catch {
        alert("Incorrect password");
      }
    }
  };

  const addAccount = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");

    window.location.href = "/";
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Switch Account</h2>

      {accounts.map((acc) => (
        <div key={acc.username} style={{ margin: "10px" }}>
          <button onClick={() => switchAccount(acc.username)}>
            👤 {acc.username}
          </button>
        </div>
      ))}

      <br />

      <button onClick={addAccount}>+ Add New Account</button>
    </div>
  );
}

export default SwitchAccount;
