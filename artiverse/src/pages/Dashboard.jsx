import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

/* ---------- NAVBAR ---------- */
function Navbar() {
  return (
    <div className="navbar">
      <h2>🎨 Artiverse</h2>
      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
}

/* ---------- LOGIN ---------- */
function Login() {
  const nav = useNavigate();

  function login(e) {
    e.preventDefault();
    nav("/role");
  }

  return (
    <div className="card">
      <h2>Login</h2>
      <button onClick={login}>Login</button>
    </div>
  );
}

/* ---------- ROLE SELECT ---------- */
function RoleSelect() {
  const nav = useNavigate();
  function selectRole(role) {
    localStorage.setItem("role", role);
    nav("/details");
  }

  return (
    <div className="card">
      <h2>Select Role</h2>
      <button onClick={() => selectRole("Admin")}>Admin</button>
      <button onClick={() => selectRole("Curator")}>Curator</button>
      <button onClick={() => selectRole("Artist")}>Artist</button>
      <button onClick={() => selectRole("Visitor")}>Visitor</button>
    </div>
  );
}

/* ---------- USER DETAILS ---------- */
function UserDetails() {
  const [name, setName] = useState("");
  const nav = useNavigate();

  function save() {
    localStorage.setItem("name", name);
    nav("/dashboard");
  }

  return (
    <div className="card">
      <h2>Enter Name</h2>
      <input onChange={(e) => setName(e.target.value)} />
      <button onClick={save}>Continue</button>
    </div>
  );
}

/* ---------- DASHBOARD ---------- */
function Dashboard() {
  const nav = useNavigate();
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name") || "User";

  if (!role) {
    nav("/");
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="card">
        <h2>Welcome {name}</h2>
        <p>Role: {role}</p>

        <button onClick={() => nav("/gallery")}>🖼 Gallery</button>

        {(role === "Artist" || role === "Admin") && (
          <button onClick={() => nav("/upload")}>⬆ Upload Art</button>
        )}

        {(role === "Admin" || role === "Curator") && (
          <button onClick={() => nav("/manage")}>🛠 Manage Gallery</button>
        )}
      </div>
    </>
  );
}

/* ---------- UPLOAD ART ---------- */
function UploadArtwork() {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [image, setImage] = useState("");

  function upload() {
    const arts = JSON.parse(localStorage.getItem("userArts")) || [];
    arts.push({
      title,
      artist,
      image,
      status: "Pending",
    });
    localStorage.setItem("userArts", JSON.stringify(arts));
    nav("/gallery");
  }

  return (
    <div className="card">
      <h2>Upload Artwork</h2>
      <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Artist" onChange={(e) => setArtist(e.target.value)} />
      <input placeholder="Image URL" onChange={(e) => setImage(e.target.value)} />
      <button onClick={upload}>Upload</button>
    </div>
  );
}

/* ---------- GALLERY ---------- */
function Gallery() {
  const arts = JSON.parse(localStorage.getItem("userArts")) || [];

  return (
    <>
      <Navbar />
      <div className="card">
        <h2>Gallery</h2>
        {arts.map((a, i) => (
          <div key={i}>
            <img src={a.image} width="200" />
            <h4>{a.title}</h4>
            <p>{a.artist}</p>
            <p>Status: {a.status}</p>
          </div>
        ))}
      </div>
    </>
  );
}

/* ---------- MANAGE GALLERY ---------- */
function ManageGallery() {
  const [arts, setArts] = useState(JSON.parse(localStorage.getItem("userArts")) || []);
  const role = localStorage.getItem("role");

  function updateStatus(index, status) {
    const updated = [...arts];
    updated[index].status = status;
    setArts(updated);
    localStorage.setItem("userArts", JSON.stringify(updated));
  }

  function deleteArt(index) {
    const updated = arts.filter((_, i) => i !== index);
    setArts(updated);
    localStorage.setItem("userArts", JSON.stringify(updated));
  }

  return (
    <>
      <Navbar />
      <div className="card">
        <h2>Manage Gallery</h2>

        {arts.map((art, i) => (
          <div key={i}>
            <img src={art.image} width="200" />
            <h4>{art.title}</h4>
            <p>Artist: {art.artist}</p>
            <p>Status: <b>{art.status}</b></p>

            {role === "Curator" && (
              <>
                <button onClick={() => updateStatus(i, "Accepted")}>✅ Accept</button>
                <button onClick={() => updateStatus(i, "Rejected")}>❌ Reject</button>
              </>
            )}

            {role === "Admin" && (
              <button onClick={() => deleteArt(i)}>🗑 Delete</button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

/* ---------- PROFILE ---------- */
function Profile() {
  const nav = useNavigate();
  function logout() {
    localStorage.clear();
    nav("/");
  }

  return (
    <>
      <Navbar />
      <button onClick={logout}>Logout</button>
    </>
  );
}

/* ---------- ROUTES ---------- */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/role" element={<RoleSelect />} />
        <Route path="/details" element={<UserDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadArtwork />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/manage" element={<ManageGallery />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
