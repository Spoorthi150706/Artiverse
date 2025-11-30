import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import ExploreHeatmap from "./pages/ExploreHeatmap";
import UploadArtwork from "./pages/UploadArtwork";
import BuyPage from "./pages/BuyPage";


/* ---------- CONSTANTS ---------- */
const ADMIN_IDS = ["ADM1", "ADM2", "ADM3"];

/* ---------- NAVBAR ---------- */
function Navbar() {
  return (
    <div className="navbar">
      <h2>🎨 Artiverse</h2>
      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/cart">🛒 Cart</Link>
      </div>
    </div>
  );
}

/* ---------- LOGIN ---------- */
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  function login(e) {
    e.preventDefault();
    localStorage.setItem("user", email);
    nav("/role");
  }

  return (
    <div className="bg">
      <div className="card">
        <h1>🎨 ARTIVERSE</h1>
        <p>Fun & Colourful Art World</p>

        <form onSubmit={login}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        {/* ✅ SIGN UP LINK */}
        <p style={{ marginTop: "10px" }}>
          New user?{" "}
          <span
            style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
            onClick={() => nav("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
function SignUp() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function signup(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Fill all fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ name, email, password });
   localStorage.setItem("users", JSON.stringify(users));


    alert("✅ Signup successful");
    nav("/");
  }

  return (
    <div className="bg">
      <div className="card">
        <h2>Sign Up</h2>
        <form onSubmit={signup}>
          <input placeholder="Name" onChange={e => setName(e.target.value)} />
          <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          <button>Create Account</button>
        </form>
      </div>
    </div>
  );
}


/* ---------- ROLE ---------- */
function RoleSelect() {
  const nav = useNavigate();
  const select = (role) => {
    localStorage.setItem("role", role);
    role === "Admin" ? nav("/admin-verify") : nav("/details");
  };

  return (
    <div className="bg">
      <div className="card">
        <h2>Choose Role</h2>
        {["Admin", "Curator", "Artist", "Visitor"].map(r =>
          <button key={r} onClick={() => select(r)}>{r}</button>
        )}
      </div>
    </div>
  );
}

/* ---------- ADMIN VERIFY ---------- */
function AdminVerification() {
  const [id, setId] = useState("");
  const nav = useNavigate();

  function verify() {
    ADMIN_IDS.includes(id)
      ? nav("/dashboard")
      : alert("Invalid Admin ID");
  }

  return (
    <div className="bg">
      <div className="card">
        <input placeholder="Admin ID" onChange={(e) => setId(e.target.value)} />
        <button onClick={verify}>Verify</button>
      </div>
    </div>
  );
}

/* ---------- NAME ---------- */
function UserDetails() {
  const nav = useNavigate();
  return (
    <div className="bg">
      <div className="card">
        <input placeholder="Enter Name" onChange={e => localStorage.setItem("name", e.target.value)} />
        <button onClick={() => nav("/dashboard")}>Continue</button>
      </div>
    </div>
  );
}

/* ---------- DASHBOARD ---------- */
function Dashboard() {
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");
  const nav = useNavigate();

  return (
    <>
      <Navbar />
      <div className="bg">
        <div className="card">
          <h2>Welcome {name}</h2>
          <p>Role: {role}</p>

          <button onClick={() => nav("/explore")}>Explore Heatmap</button>
          <button onClick={() => nav("/gallery")}>Gallery</button>

          {(role === "Admin" || role === "Artist") &&
            <button onClick={() => nav("/upload")}>Upload Art</button>}

          {(role === "Admin" || role === "Curator") &&
            <button onClick={() => nav("/manage")}>Manage Gallery</button>}
        </div>
      </div>
    </>
  );
}

/* ---------- GALLERY ---------- */
function Gallery() {
  const nav = useNavigate();
  const role = localStorage.getItem("role");
  const arts = JSON.parse(localStorage.getItem("userArts")) || [];

  function addToCart(art) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(art);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("✅ Added to cart");
  }

  function trackView(art) {
    const history = JSON.parse(localStorage.getItem("viewHistory")) || [];
    history.push({
      title: art.title,
      artist: art.artist,
      time: new Date().toLocaleString()
    });
    localStorage.setItem("viewHistory", JSON.stringify(history));
    nav("/history");
  }

  return (
    <>
      <Navbar />
      <div className="card">
        <h2>Gallery</h2>

        {arts.length === 0 && <p>No artworks available</p>}

        {arts.map((a, i) => (
          <div key={i}>
            <img src={a.image} alt="" className="art-img" />
            <p>{a.title}</p>
            <p>{a.artist}</p>

            <button onClick={() => trackView(a)}>
              View History
            </button>

            {role === "Visitor" && (
              <button onClick={() => addToCart(a)}>
                Add to Cart 🛒
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

/* ---------- HISTORY ---------- */
function ViewHistory() {
  const history = JSON.parse(localStorage.getItem("viewHistory")) || [];

  return (
    <>
      <Navbar />
      <div className="card">
        <h2>Artwork History</h2>

        {history.length === 0 ? <p>No views yet</p> :
          history.map((h, i) => (
            <div key={i}>
              <b>{h.title}</b> by {h.artist}
              <p>{h.time}</p>
              <hr />
            </div>
          ))
        }
      </div>
    </>
  );
}

/* ---------- MANAGE ---------- */
function ManageGallery() {
  const role = localStorage.getItem("role");
  const [arts, setArts] = useState(JSON.parse(localStorage.getItem("userArts")) || []);

  if (role !== "Curator" && role !== "Admin") return <h3>Access Denied</h3>;

  function remove(i) {
    const updated = arts.filter((_, index) => index !== i);
    localStorage.setItem("userArts", JSON.stringify(updated));
    setArts(updated);
  }

  return (
    <>
      <Navbar />
      <div className="card">
        <h2>Manage Gallery</h2>
        {arts.map((a, i) => (
          <div key={i}>
            <p>{a.title}</p>
            <button onClick={() => remove(i)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

/* ---------- PROFILE ---------- */
function Profile() {
  const nav = useNavigate();
  return (
    <>
      <Navbar />
      <button onClick={() => { localStorage.clear(); nav("/"); }}>Logout</button>
    </>
  );
}
function Cart() {
  const nav = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  return (
    <>
      <Navbar />
      <div className="card">
        <h2>🛒 Cart</h2>

        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <>
            {cart.map((item, i) => (
              <div key={i}>
                <p>{item.title} — {item.artist}</p>
              </div>
            ))}
            <button onClick={() => nav("/buy")}>
              Proceed to Payment 💳
            </button>
          </>
        )}
      </div>
    </>
  );
}

/* ---------- ROUTES ---------- */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/role" element={<RoleSelect />} />
        <Route path="/details" element={<UserDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<ExploreHeatmap />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/upload" element={<UploadArtwork />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/history" element={<ViewHistory />} />
        <Route path="/manage" element={<ManageGallery />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/admin-verify" element={<AdminVerification />} />
      </Routes>
    </BrowserRouter>
  );
}
