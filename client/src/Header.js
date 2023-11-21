import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom } from "./recoil/userAtom";
import { message } from "antd";

export default function Header() {
  const [user, setUser] = useRecoilState(userAtom);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser({ username: "", token: "", id: null });
    message.info("You're successfully logged out!");
  };

  if (user.id) {
    return (
      <header>
        <a href="/" className="logo">
          MyBlog
        </a>
        <nav>
          <Link to="/createpost">Create post</Link>
          <Link to="/profile">{user.username}</Link>
          <div onClick={handleLogout}>Logout</div>
        </nav>
      </header>
    );
  }
  return (
    <header>
      <a href="/" className="logo">
        MyBlog
      </a>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/Register">Register</Link>
      </nav>
    </header>
  );
}
