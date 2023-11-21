import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function login(data) {
    return fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    login({ username, password })
      .then((res) => res.json())
      .then((res) => {
        if (res.isSuccess) {
          message.success("Login success");
          window.localStorage.setItem("user", JSON.stringify(res.user));
          navigate("/");
          return;
        }

        message.error(res.message);
      })
      .catch((err) => {
        message.error(err.message);
      });
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={({ target: { value } }) => setUsername(value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
      />
      <button>Login</button>
    </form>
  );
}
