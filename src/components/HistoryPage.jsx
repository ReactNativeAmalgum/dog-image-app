import React from "react";
import FlatList from "flatlist-react";
import "./HistoryPage.css";
import { useNavigate } from "react-router-dom";
import home from "../assets/home.png";
import cart from "../assets/cart.png";

const HistoryPage = ({ history }) => {
  const navigate = useNavigate();
  const handleAddToCart = (imageUrl) => {
    navigate("/cart", { state: { imageUrl } });
  };
  return (
    <div className="history-page">
      <div className="buttonStyle">
        <img
          onClick={() => navigate("/")}
          className="histImgIcom"
          src={home}
          alt="Home"
        />

        <img
          onClick={() => navigate("/cart")}
          className="histImgIcom"
          src={cart}
          alt="Cart"
        />
      </div>
      <h1>History</h1>

      {history.length === 0 ? (
        <p>No images fetched yet.</p>
      ) : (
        <div className="history-content">
          <FlatList
            list={history}
            renderItem={(imageUrl, index) => (
              <div key={index} className="history-item">
                <img
                  src={imageUrl}
                  alt={`Dog ${index}`}
                  className="history-image"
                />
                <button
                  className="add-to-cart-button"
                  onClick={() => handleAddToCart(imageUrl)}
                >
                  Add to Cart
                </button>
              </div>
            )}
            renderWhenEmpty={() => <div>List is empty!</div>}
          />
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
