// src/components/CheckoutItem.jsx
import React from 'react';

const CheckoutItem = ({ checkout, events }) => {
  const eventData = events.find((event) => event.id === checkout.tickets.id);

  return (
    <div className="itemCheckout card">
      <div className="dataCheckout card-body">
        <h5 className="titleEvent card-title">{eventData.festivalName}</h5>
        {/* ... (Tampilan lainnya sesuai kebutuhan) */}
      </div>
    </div>
  );
};

export default CheckoutItem;
