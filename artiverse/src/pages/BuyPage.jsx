import { useNavigate } from "react-router-dom";

export default function BuyPage() {
  const nav = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const buyNow = () => {
    alert("✅ Purchase Successful!");
    localStorage.removeItem("cart");
    nav("/gallery");
  };

  return (
    <div className="bg">
      <div className="card">
        <h2>💳 Buy Artworks</h2>

        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <>
            {cart.map((item, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <p><b>{item.title}</b></p>
                <p>Artist: {item.artist}</p>
              </div>
            ))}

            <button onClick={buyNow}>✅ Buy Now</button>
          </>
        )}
      </div>
    </div>
  );
}
