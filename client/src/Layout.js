import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <main>
      <Header />
      {children}
      <Outlet />
    </main>
  );
}
