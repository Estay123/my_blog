import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function register(data) {
    return fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    register({ username, password }).catch((err) => {});
  }

  return (
    <form className="reister" onSubmit={handleSubmit}>
      <h1>Register</h1>
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
      <button>Register</button>
    </form>
  );
}
