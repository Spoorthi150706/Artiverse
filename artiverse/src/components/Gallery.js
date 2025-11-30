import React from "react";

function Gallery({ userType }) {
  const paintings = [
    { id: 1, title: "Mona Lisa", price: 5000 },
    { id: 2, title: "Starry Night", price: 7000 },
    // ... other paintings
  ];

  const addToCart = (painting) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(painting);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${painting.title} added to cart!`);
  };

  return (
    <div className="gallery">
      {paintings.map((p) => (
        <div key={p.id} className="painting-card">
          <h3>{p.title}</h3>
          <p>Price: ${p.price}</p>
          {userType === "Visitor" && (
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Gallery;
