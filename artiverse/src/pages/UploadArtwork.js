import { useState } from "react";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";

export default function UploadArtwork() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [image, setImage] = useState(null);
  const nav = useNavigate();

  async function upload(e) {
    e.preventDefault();

    if (!title || !artist || !image) {
      alert("❌ Please fill all fields");
      return;
    }

    try {
      // ✅ COMPRESS IMAGE
      const compressedFile = await imageCompression(image, {
        maxSizeMB: 0.3,          // ~300KB
        maxWidthOrHeight: 800,   // resize
        useWebWorker: true,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        const arts = JSON.parse(localStorage.getItem("userArts")) || [];

        // ✅ Allow max 10 artworks
        if (arts.length >= 10) {
          alert("❌ Maximum 10 artworks allowed");
          return;
        }

       arts.push({
  title,
  artist,
  image: reader.result,
  status: "pending"   // ✅ NEW
});

        localStorage.setItem("userArts", JSON.stringify(arts));
        alert("✅ Artwork uploaded");
        nav("/gallery");
      };

      reader.readAsDataURL(compressedFile);
    } catch (err) {
      alert("❌ Storage full. Please delete old artworks.");
    }
  }

  return (
    <div className="bg">
      <div className="card">
        <h2>⬆ Upload Artwork (Max 10)</h2>

        <form onSubmit={upload}>
          <input
            placeholder="Artwork Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            placeholder="Artist Name"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}
