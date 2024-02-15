const apiCart = 'https://79c7-2001-448a-20a0-4169-d4b6-218e-ebfa-7a3a.ngrok-free.app/cart'
const apiEvent = 'https://79c7-2001-448a-20a0-4169-d4b6-218e-ebfa-7a3a.ngrok-free.app/event';

const cartId = sessionStorage.getItem('cartId');
const putForm = document.querySelector(".put");
const customerName = document.getElementById('customerName');
const phoneNumber = document.getElementById('phoneNumber');
const listEvent = document.querySelector('.listEvent');
const quantity = document.querySelector('.quantity');
const totalPrice = document.querySelector('.totalPrice');


fetch(apiCart, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': true,
    'Ngrok-Version': '2'
    }
})
.then(response => response.json())
.then(data => {
    console.log(data.data[cartId]);
})

putForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const updatedData = {
    customerName: customerName.value,
    phoneNumber: phoneNumber.value,
    tickets: {
      id: listEvent.value,
      quantity: quantity.value
    }
  };

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': true,
      'Ngrok-Version': '2'
    },
    body: JSON.stringify(updatedData),
  };

  // Mengirim PUT Request
  fetch(`${apiCart}/${cartId}`, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Update Successful:', data);
      // Balik ke get-delete.html
      window.location.href = `get-delete.html?id=${cartId}`
    })
    .catch(error => {
      console.error('Error:', error.message);
    });

    
});

// Fetch data event
fetch(apiEvent, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': true,
      'Ngrok-Version': '2'
    }
  })
    .then(response => response.json())
    .then(data => {
      listEvent.innerHTML = '';
  
      data.data.forEach(event => {
        const option = document.createElement('option');
        option.value = event.id;
        option.text = event.festivalName;
        listEvent.add(option);
      });
  
      listEvent.dispatchEvent(new Event('change'));
    })
    .catch(error => {
      console.error('Error fetching events:', error);
      listEvent.innerHTML = '<option selected>Error fetching events</option>';
    });
  
  // Event listener listEvent
  listEvent.addEventListener('change', calculateTotalPrice);
  
  // Event listener quantity
  quantity.addEventListener('input', calculateTotalPrice);
  
  // Function Total Harga
  function calculateTotalPrice() {
    const selectedEventId = parseInt(listEvent.value);
    const inputQuantity = parseInt(quantity.value);
  
    fetch(apiEvent, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': true,
        'Ngrok-Version': '2'
      }
    })
      .then(res => res.json())
      .then(data => {
        const selectedEvent = data.data.find(event => event.id === selectedEventId);
  
        if (selectedEvent) {
          const eventPrice = selectedEvent.price;
          const total = eventPrice * inputQuantity;
          totalPrice.textContent = total;
        }
      });
  }

  