import { Link } from "react-router-dom";

export default function Navbar() {
  if (!localStorage.getItem("user")) return null;

  return (
    <>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/profile">Profile</Link>
    </>
  );
}
