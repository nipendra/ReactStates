import React, {useState} from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from './Products';
import {Routes, Route} from 'react-router-dom';
import Detail from './Detail';
import Cart from './Cart'
export default function App() {
  const [cart, setCart] = useState([]);

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

  function updateQuantity(sku, quantitiy) {
    setCart((items) =>{
      return items.map((i) => i.sku===sku ? {...i, quantitiy} : i);
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
