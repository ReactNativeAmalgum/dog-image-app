import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomePage.css"; // Import the CSS file
import home from "../assets/home.png";
import history from "../assets/history.png";
import cart from "../assets/cart.png";
import { useNavigate } from "react-router-dom";

const HomePage = ({ addToHistory }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchDogImage = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://dog.ceo/api/breeds/image/random"
      );
      setImageUrl(response.data.message);
      addToHistory(response.data.message);
    } catch (error) {
      console.error("Error fetching dog image:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDogImage();
  }, []);

  return (
    <div className="homepage">
      <h1 className="title">Random Dog Image</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="content">
          <img className="dog-image" src={imageUrl} alt="Dog" />
        </div>
      )}

      <button className="fetch-button" onClick={fetchDogImage}>
        Fetch New Image
      </button>
      <div className="borderdiv">
        <img
          onClick={() => navigate("/")}
          className="imgIcon"
          src={home}
          alt="Home"
        />
        <img
          onClick={() => navigate("/history")}
          className="imgIcon"
          src={history}
          alt="History"
        />
        <img
          onClick={() => navigate("/cart")}
          className="imgIcon"
          src={cart}
          alt="Cart"
        />
      </div>
    </div>
  );
};

export default HomePage;
