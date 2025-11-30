import { useNavigate } from "react-router-dom";

export default function Profile() {
  const nav = useNavigate();

  return (
    <button onClick={() => {
      localStorage.clear();
      nav("/");
    }}>
      Logout
    </button>
  );
}
