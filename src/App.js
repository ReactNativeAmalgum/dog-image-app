
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import HistoryPage from './components/HistoryPage';
import CartPage from './components/CartPage';

const App = () => {
  const [history, setHistory] = useState([]);
  const [cart, setCart] = useState([]);

  const addToHistory = (imageUrl) => {
    setHistory((prevHistory) => [...prevHistory, imageUrl]);
  };

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  return (
    <Router>
      <Routes >
        <Route
          path="/"
          element={<HomePage addToHistory={addToHistory} />}
        />
        <Route
          path="/history"
          element={<HistoryPage history={history} />}
        />
        <Route
          path="/cart"
          element={<CartPage cart={cart} setCart={setCart} addToCart={addToCart} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
