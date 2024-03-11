// src/components/CartItem.jsx
import React from 'react';

const CartItem = ({ cart, events, onDelete, onEdit, onCheckout }) => {
  const eventData = events.find((event) => event.id === cart.tickets.id);

  return (
    <div className="itemCart card">
      <div className="dataCart card-body" data-id={cart.id}>
        <h5 className="titleEvent card-title">{eventData.festivalName}</h5>
        {/* ... (Tampilan lainnya sesuai kebutuhan) */}
        <div className="itemBtn">
          <button className="btn editCart btn-primary" onClick={() => onEdit(cart.id)}>Edit</button>
          <button className="btn deleteCart btn-danger" onClick={() => onDelete(cart.id)}>Hapus</button>
          <button className="btn checkoutBtn btn-success" onClick={() => onCheckout(cart.id)}>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
