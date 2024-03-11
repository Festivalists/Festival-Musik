// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import CartList from './components/CartList';
import CheckoutList from './components/CheckoutList';

const App = () => {
  const [carts, setCarts] = useState([]);
  const [checkouts, setCheckouts] = useState([]);
  const [events, setEvents] = useState([]);
  const history = useNavigate();

  // ... (Implementasi useEffect dan fungsi-fungsi lainnya sama seperti sebelumnya)

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/checkout">Checkout</Link></li>
          </ul>
        </nav>

        <Switch>
          <Route path="/cart">
            <CartList carts={carts} events={events} onDelete={handleDelete} onEdit={handleEdit} onCheckout={handleCheckout} />
          </Route>
          <Route path="/checkout">
            <CheckoutList checkouts={checkouts} events={events} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
