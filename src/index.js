import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import All from './components/All';
import Clothes from './components/Clothes';
import Tech from './components/Tech';
import Cart from './components/Cart';
import Item from './components/Item';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <Router>
    <Routes>
      <Route path='/' element={<All></All>}></Route>
      <Route path='/all' element={<All></All>}></Route>
      <Route path='/clothes' element={<Clothes></Clothes>}></Route>
      <Route path='/tech' element={<Tech></Tech>}></Route>
      <Route path='/cart' element={<Cart></Cart>}></Route>
      <Route path='/item/:id' element={<Item></Item>}></Route>
    </Routes>
  </Router>
);

reportWebVitals();
