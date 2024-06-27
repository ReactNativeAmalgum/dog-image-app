
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import HistoryPage from './components/HistoryPage';
import CartPage from './components/CartPage';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';

const App = () => {
  const [history, setHistory] = useState([]);
  const [cart, setCart] = useState([]);
  
  useEffect(() =>{
    const loadHistory = () =>{
      const storedHistory = localStorage.getItem('imageHistory');
      if(storedHistory){
        setHistory(JSON.parse(storedHistory))
      }
    }
    loadHistory()
  },[])
  const addToHistory = async (imageUrl) => {
    try {
      const updatedHistory = [imageUrl, ...history];
      setHistory(updatedHistory);
      await AsyncStorage.setItem('imageHistory',  JSON.stringify(updatedHistory));
    } catch (error) {
      console.log("Error while saving images".error)
    }
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
