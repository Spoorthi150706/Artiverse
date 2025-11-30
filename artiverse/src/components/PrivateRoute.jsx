import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  return localStorage.getItem("user") ? <Outlet /> : <Navigate to="/" />;
}
