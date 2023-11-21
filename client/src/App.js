import "./App.css";

import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/profile";
import CreatePost from "./pages/createPost";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<IndexPage />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/createpost" element={<CreatePost />} />
      </Routes>
    </Layout>
  );
}

export default App;
