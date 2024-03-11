// src/components/CheckoutList.jsx
import React from 'react';
import CheckoutItem from './CheckoutItem';

const CheckoutList = ({ checkouts, events }) => {
  return (
    <div>
      <h2>Checkout</h2>
      {checkouts.map((checkout) => (
        <CheckoutItem key={checkout.id} checkout={checkout} events={events} />
      ))}
    </div>
  );
};

export default CheckoutList;
