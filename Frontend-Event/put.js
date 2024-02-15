const apiEvent = 'https://79c7-2001-448a-20a0-4169-d4b6-218e-ebfa-7a3a.ngrok-free.app/event';

const EventId = sessionStorage.getItem('id');
const putForm = document.querySelector(".put");
const festivalName = document.getElementById("festivalName");
const performers = document.getElementById('performers');
const price = document.getElementById('price');
const image = document.getElementById('image');


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
    console.log(data.data[EventId]);
})

putForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const updatedData = {
    festivalName: festivalName.value,
    performers: performers.value,
    price: price.value,
    image: image.value
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
  fetch(`${apiEvent}/${EventId}`, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Update Successful:', data);
      // Balik ke get.html
      window.location.href = `get.html?id=${EventId}`
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
});