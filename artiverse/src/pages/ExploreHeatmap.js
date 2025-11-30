import React from "react";
import { useNavigate } from "react-router-dom";

export default function ExploreHeatmap() {
  const nav = useNavigate();
  const role = localStorage.getItem("role");
  const arts = JSON.parse(localStorage.getItem("userArts")) || [];
  const views = JSON.parse(localStorage.getItem("artViews")) || {};

  const addToCart = (art) => {
    if (role !== "Visitor") return;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart.find((a) => a.title === art.title)) {
      cart.push(art);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${art.title} added to cart!`);
    } else {
      alert(`${art.title} is already in cart`);
    }
  };

  const trackView = (art) => {
    views[art.title] = (views[art.title] || 0) + 1;
    localStorage.setItem("artViews", JSON.stringify(views));
    nav("/history");
  };

  return (
    <>
      <h2>📊 Explore Heatmap</h2>
      <div>
        {arts.length === 0 && <p>No artworks uploaded</p>}
        {arts.map((art, i) => (
          <div key={i} style={{ marginBottom: "15px" }}>
            <img src={art.image} alt={art.title} style={{ width: "200px" }} />
            <p>{art.title}</p>
            <p>👨‍🎨 {art.artist}</p>
            <p>Viewed: {views[art.title] || 0}</p>

            {/* Add to Cart only for visitors */}
            {role === "Visitor" && (
              <button onClick={() => addToCart(art)}>Add to Cart 🛒</button>
            )}

            <button onClick={() => trackView(art)}>View History</button>
          </div>
        ))}
      </div>
    </>
  );
}
