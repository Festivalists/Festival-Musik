// src/components/CartList.jsx
import React from 'react';
import CartItem from './CartItem';

const CartList = ({ carts, events, onDelete, onEdit, onCheckout }) => {
  return (
    <div>
      <h2>Cart</h2>
      {carts.map((cart) => (
        <CartItem key={cart.id} cart={cart} events={events} onDelete={onDelete} onEdit={onEdit} onCheckout={onCheckout} />
      ))}
    </div>
  );
};

export default CartList;
