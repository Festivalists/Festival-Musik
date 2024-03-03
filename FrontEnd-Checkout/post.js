const apiCart = 'https://79c7-2001-448a-20a0-4169-d4b6-218e-ebfa-7a3a.ngrok-free.app/cart';
const apiEvent = 'https://79c7-2001-448a-20a0-4169-d4b6-218e-ebfa-7a3a.ngrok-free.app/event';
const apiCheckout = 'https://79c7-2001-448a-20a0-4169-d4b6-218e-ebfa-7a3a.ngrok-free.app/checkout';

const postForm = document.querySelector(".post");
const customerName = document.getElementById('customerName');
const phoneNumber = document.getElementById('phoneNumber');
const listEvent = document.querySelector('.listEvent');
const quantity = document.querySelector('.quantity');
const totalPrice = document.querySelector('.totalPrice');



// Fungsi untuk membuat permintaan API Cart
function fetchApiCart(apiCart, method = 'GET', options) {
    return fetch(apiCart, {
      method,
      headers: options.headers,
      body: options.body
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }else {
            alert("Pesanan berhasil ditambahkan ke cart")
        }
  
        // Periksa jika terdapat konten dalam respons
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return response.json(); // Mengembalikan janji (Promise) dari json()
        } else {
          return response.text(); // Mengembalikan janji (Promise) dari text()
        }
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
  }
  

postForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Mencegah pengiriman formulir default

  const requestBody = {
    customerName: customerName.value,
    phoneNumber: phoneNumber.value,
    tickets: {
      id: listEvent.value,
      quantity: quantity.value
    }
  };

  const options = {
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': true,
      'Ngrok-Version': '2'
    },
    body: JSON.stringify(requestBody)
  };

  fetchApiCart(apiCart, 'POST', options)
    .then(data => {
      console.log('Response:', data);
      console.log('Request body:', options.body);

      window.location.href = `get-delete.html`
    })
    .catch(error => {
        console.error('Error:', error.message);
        console.log('Request body:', options.body);
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
