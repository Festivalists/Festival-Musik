const apiEvent = 'https://79c7-2001-448a-20a0-4169-d4b6-218e-ebfa-7a3a.ngrok-free.app/event';

const postForm = document.querySelector(".post");
const festivalName = document.querySelector('input[name="festivalName"]');
const performers = document.querySelectorAll('input[name="performers[]"]');
const price = document.querySelector('input[name="price"]');
const image = document.querySelector('input[name="image"]');

// Fungsi untuk membuat permintaan API Event
function fetchApiEvent(apiEvent, method = 'GET', options) {
  return fetch(apiEvent, {
    method,
    headers: options.headers,
    body: options.body
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }else {
          alert("Pesanan berhasil ditambahkan ke Event")
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

  const performersArray = Array.from(performers).map(input => input.value);

  const requestBody = {
    festivalName: festivalName.value,
    performers: performersArray,
    price: price.value,
    image: image.value
  };

  const options = {
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': true,
      'Ngrok-Version': '2'
    },
    body: JSON.stringify(requestBody)
  };

  fetchApiEvent(apiEvent, 'POST', options)
    .then(data => {
      console.log('Response:', data);
      console.log('Request body:', options.body);

      window.location.href = 'get.html';
    })
    .catch(error => {
      console.error('Error:', error.message);
      console.log('Request body:', options.body);
    });
});
