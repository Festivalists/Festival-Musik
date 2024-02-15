const apiEvent = 'https://79c7-2001-448a-20a0-4169-d4b6-218e-ebfa-7a3a.ngrok-free.app/event'
const img = 'https://79c7-2001-448a-20a0-4169-d4b6-218e-ebfa-7a3a.ngrok-free.app'

const bodyEvent = document.querySelector('.bodyEvent')

function fetchAPI(url, method = 'GET', headers = {}) {
    return fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': true,
            'Ngrok-Version': '2'
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        });
}

const showEvent = (events) => {
    let output = ''
    events.forEach(event => {
        output += `
            <div class="itemEvent card">
                <div class="dataEvent card-body" data-id=${event.id}>
                <img src="${img}${event.image}" class="img-fluid">
                    <h5 class="titleEvent card-title">${event.festivalName}</h5>
                    <p class="card-text performers">Performers : ${event.performers}</p>
                    <p class="card-text phoneNumber">Harga Tiket : ${event.price}</p>
                    <div class="itemBtn">
                        <a href="#" class="btn editEvent btn-primary">Edit</a>
                        <a href="#" class="btn deleteEvent btn-danger">Hapus</a>
                    </div>
                </div>
            </div>
        `;
    });
    bodyEvent.innerHTML = output;
}

bodyEvent.addEventListener('click', (e) => {
    e.preventDefault(); // Mencegah pengiriman formulir default
    let delButtonIsPressed = e.target.classList.contains('deleteEvent')
    let editButtonIsPressed = e.target.classList.contains('editEvent')

    // Ambil nilai data-id
    const EventId = e.target.closest('.dataEvent').dataset.id;
    sessionStorage.setItem('EventId', EventId);

    if (delButtonIsPressed) {
        fetch(`${apiEvent}/${EventId}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => location.reload())

    }

    if (editButtonIsPressed) {
        window.location.href = `put.html?id=${EventId}`;
    }
});

Promise.all([
    fetchAPI(apiEvent),
])
    .then(responses => {
        // responses berisi array hasil dari setiap permintaan API
        const [event] = responses;

        console.log('Data Event:', event);

        const events = event.data;

        showEvent(events);
    })