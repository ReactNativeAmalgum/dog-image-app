import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CartPage.css";
import image from "../assets/image.png";
import del from "../assets/del.png";
import home from "../assets/home.png";
import shop from "../assets/cart.png";
import history from "../assets/history.png";

const CartPage = ({ cart, addToCart, setCart }) => {
  const location = useLocation();
  const [imageUrl, setImageUrl] = useState(""); // Initialize imageUrl state with empty string
  const [price, setPrice] = useState(0);
  const [subTotal, setSubTotal] = useState(0)
  const navigate = useNavigate();

  useEffect(() => {
    // Set imageUrl state when location state changes
    if (location.state && location.state.imageUrl) {
      setImageUrl(location.state.imageUrl);
    }
  }, [location.state]);

  useEffect(() => {
    // Update total whenever cart changes
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    setTotal(total);
  }, [cart]);

  const [total, setTotal] = useState(0); // Initialize total state with 0

  const handleAddToCart = () => {
    if (imageUrl && price > 0) {
      addToCart({ imageUrl, price: parseFloat(price) });
      setPrice(0); // Reset price after adding to cart
      console.log("Item added to cart:", { imageUrl, price });
    } else {
      console.log("Invalid imageUrl or price:", { imageUrl, price });
    }
  };

  const incrementCount = () => {
    setPrice(parseFloat(price) + 1);
  };

  const decrementCount = () => {
    if (parseFloat(price) > 0) {
      setPrice(parseFloat(price) - 1);
    }
  };

  const deleteItem = () => {
    const deletedItem = cart.find((item) => item.imageUrl === imageUrl);
    if (deletedItem) {
      // Remove the item from cart
      const updatedCart = cart.filter((item) => item.imageUrl !== imageUrl);
      setCart(updatedCart); // Update cart with filtered array
      setTotal(total - deletedItem.price); // Decrease total by deleted item's price
      console.log("Item deleted from cart:", imageUrl);
    }
  };

  const placeOrder = () => {
    if(cart.length === 0){
      alert('Please select your order')
    }else{
      alert('Order Confirmed!')
      setCart([]);
      setTotal(0);
    }

  };

  useEffect(() => {
    const calculateSubTotal = () => {
      const shippingCost = 100;
      const subTotal = total + shippingCost;
      setSubTotal(subTotal);
    };
    calculateSubTotal();
  }, [total]);

  return (
    <div className="cart-page">
      <div className="cart-buttonStyle">
        <img
          onClick={() => navigate("/")}
          className="histImgIcom"
          src={home}
          alt="Home"
        />

        <img
          onClick={() => navigate("/history")}
          className="histImgIcom"
          src={history}
          alt="Cart"
        />
      </div>

      <div className="inner-cart-page">
        <div className="cart-content">
          <div className="total">
            <img className="cartIcon" src={shop} alt="Cart" />
            <div className="totalSpan">Total: ${total.toFixed(2)}</div>
          </div>
          <div className="image-container">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Dog in Cart"
                className="cart-dog-image"
              />
            ) : (
              <img src={image} alt="Default" className="cart-dog-image" />
            )}
            <div className="btn-span-container">
              <button className="quantity-control" onClick={decrementCount}>
                -
              </button>
              <span className="quantity-control-span">{price}</span>
              <button className="quantity-control" onClick={incrementCount}>
                +
              </button>
            </div>
            <div>Net qt: {total}</div>
            <img
              className="delItem"
              src={del}
              alt="default"
              onClick={deleteItem}
            />
          </div>
        </div>
        <button className="btn-confirm" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <div className="payment-container" />
        <div className="payement-Details">Payement Details</div>
        <div className="payment-container1" />
        <div className="inline-payement">
          SubTotal <div className="amount">${total.toFixed(2)}</div>{" "}
        </div>
        <div className="payment-container1" />
        <div className="inline-payement">
          Shipping <div className="amount">$100</div>
        </div>
        <div className="payment-container1" />
        <div className="inTotal">
        Total: <div className="amount"> ${subTotal.toFixed(2)}</div>
        </div>
        <div onClick={placeOrder} className="place-order">
          Place Order
        </div>
      </div>
    </div>
  );
};

export default CartPage;
