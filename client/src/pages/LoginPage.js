import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { userAtom } from "../recoil/userAtom";
import { useSetRecoilState } from "recoil";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);

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
    //取消事件的默認動作
    event.preventDefault();
    login({ username, password })
      .then((res) => res.json())
      .then((res) => {
        if (res.isSuccess) {
          message.success("Login success");
          window.localStorage.setItem("user", JSON.stringify(res.user));
          setUser(res.user);
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
