 
// change to "admin" or "user" when needed
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ManageGallery() {
    const role = "curator";  
  const [arts, setArts] = useState([]);
  const nav = useNavigate();

  // Load artworks
  useEffect(() => {
    const storedArts = JSON.parse(localStorage.getItem("userArts")) || [];
    setArts(storedArts);
  }, []);

  // ✅ DELETE artwork
  function deleteArtwork(index) {
    const updatedArts = [...arts];
    updatedArts.splice(index, 1);

    localStorage.setItem("userArts", JSON.stringify(updatedArts));
    setArts(updatedArts);

    alert("🗑 Artwork deleted successfully");
  }
function updateStatus(index, newStatus) {
  const updatedArts = [...arts];
  updatedArts[index].status = newStatus;

  localStorage.setItem("userArts", JSON.stringify(updatedArts));
  setArts(updatedArts);

  alert(`Artwork ${newStatus}`);
}

  return (
    <div className="bg">
      <div className="card">
        <h2>🛠 Admin – Manage Gallery</h2>

        {arts.length === 0 && <p>No artworks uploaded.</p>}

        <div className="gallery-grid">
          {arts.map((art, index) => (
            <div key={index} className="art-card">
              <img src={art.image} alt={art.title} />
              <h4>{art.title}</h4>
              <p>🎨 {art.artist}</p>

              {/* DELETE (Admin only or optional) */}
{role === "admin" && (
  <button
    className="delete-btn"
    onClick={() => deleteArtwork(index)}
  >
    ❌ Delete
  </button>
)}

{/* ACCEPT / REJECT (Curator only) */}
{role === "curator" && art.status === "pending" && (
  <>
    <button
      className="accept-btn"
      onClick={() => updateStatus(index, "accepted")}
    >
      ✅ Accept
    </button>

    <button
      className="reject-btn"
      onClick={() => updateStatus(index, "rejected")}
    >
      ❌ Reject
    </button>
  </>
)}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
