import React, {useState, useEffect} from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from './Products';
import {Routes, Route} from 'react-router-dom';
import Detail from './Detail';
import Cart from './Cart'

export default function App() {
const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [];
    } 
    catch(err) {
      console.error("The cart could not be parsed into JSON.");
      return [];
    }
  });

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);


  function addToCart (id , sku) {
    setCart((items)=> {
        const itemInCart= items.find((i) => i.sku===sku);
        // copy via object assign
        // Object.assign({}, prentobj, {prams:value}) 
        // copy via spread syntex
        // const newState = {...state, role: "admin"}

        // item already in cart 
        if(itemInCart){
          return items.map((i) => (
            i.sku === sku ? {...i, quantitiy: i.quantitiy+1} : i
          ));
        } else {
          // return new array with item appended
          return [...items, {id, sku, quantitiy:1}];
        }
    })
  }

  function updateQuantity(sku, quantity) {
    setCart((items) =>{
      return quantity===0 ? items.filter((i) => i.sku !== sku) : items.map((i) => i.sku===sku ? {...i, quantity} : i);
    });
  }

  return (
    <div>
      <div className="content">
        <Header />
        <main>
          <Routes>
              <Route path="/" element={<h1>Welcome to store !</h1>} />
              <Route path="/:category" element={<Products/>} />
              <Route path="/:category/:id" element={<Detail addToCart={addToCart}/>} />
              <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity}/>} />
          </Routes>
        </main>
      </div> 
      <Footer />
    </div>
    )
}
